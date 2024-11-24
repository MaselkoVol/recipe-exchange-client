import { Box, Container, Grid, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetRecipeQuery } from "../../app/services/recipeApi";
import Image from "../../components/UI/Image";
import UserInfo from "../../components/UserInfo";
import { useColors } from "../../hooks/useColors";
import ClientLink from "../../components/UI/ClientLink";
import { formatDate } from "../../utils/functions/formatDate";
import { Bookmark, BookmarkBorder, Favorite, FavoriteBorder, Send } from "@mui/icons-material";
import MyCard from "../../components/UI/MyCard";
import Carousel from "../../components/UI/Carousel";
import { SwiperSlide } from "swiper/react";
import MyLabel from "../../components/UI/MyLabel";
import { convertToParagraphs } from "../../utils/functions/convertToParagraphs";
import { useLazyIsRecipeLikedQuery, useToggleLikeMutation } from "../../app/services/likesApi";
import ImageFullscreen from "../../components/UI/ImageFullscreen";
import LoadingPage from "../loadingPage/LoadingPage";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import UnregisteredDialog from "../../components/UnregisteredDialog";
import { useOptimisticButton } from "../../hooks/useOptimisticButton";
import { useLazyIsAddedToFavoriteQuery, useToggleFavoriteMutation } from "../../app/services/favoriteApi";
import { useAddViewMutation } from "../../app/services/viewsApi";
import SelectedTags from "../../components/SelectedTags";
import { Navigation } from "swiper/modules";
import CommentsSection from "./CommentsSection";

type Props = {};

const Recipe = (props: Props) => {
  const isAuth = useSelector((selector: RootState) => selector.auth.status);
  const colors = useColors();

  const [loginOpen, setLoginOpen] = useState(false);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  // open additional images in fullscreen
  const [selectedURL, setSelectedURL] = useState<string | null>(null);

  const params = useParams();
  const { data: recipe, isLoading: isRecipeLoading, isError: isRecipeError } = useGetRecipeQuery(params.id || "");

  // increment view count, works only once for 1 user
  const [addView] = useAddViewMutation();
  useEffect(() => {
    if (recipe && isAuth) {
      addView(recipe.id);
    }
  }, [recipe, isAuth]);

  const [isLiked, setIsLiked] = useState(false);
  const triggerLike = useOptimisticButton({
    btnValue: isLiked,
    setBtnValue: setIsLiked,
    btnDependencies: recipe?.id,
    useLazyIsBtnActiveQuery: useLazyIsRecipeLikedQuery,
    useToggleBtnMutation: useToggleLikeMutation,
  });
  const [isInFavorites, setIsInFavorites] = useState(false);
  const triggerFavorite = useOptimisticButton({
    btnValue: isInFavorites,
    setBtnValue: setIsInFavorites,
    btnDependencies: recipe?.id,
    useLazyIsBtnActiveQuery: useLazyIsAddedToFavoriteQuery,
    useToggleBtnMutation: useToggleFavoriteMutation,
  });

  return isRecipeError ? (
    <Typography>Error</Typography>
  ) : isRecipeLoading || !recipe ? (
    <LoadingPage />
  ) : (
    <Container sx={{ my: 2 }}>
      <Grid container spacing={2}>
        <Grid xs={12} item sx={{ display: { xs: "initial", md: "none" } }}>
          <MyCard>
            <Typography sx={{ fontWeight: 700 }} variant={matches ? "h4" : "h5"} component="h1">
              {recipe.title}
            </Typography>
          </MyCard>
        </Grid>
        <Grid xs={12} item>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 2 }}>
            {recipe.mainImageUrl && (
              <Image
                sx={{
                  borderRadius: 2,
                  overflow: "hidden",
                  order: { xs: 1, md: 2 },
                  width: "100%",
                  aspectRatio: "16/9",
                  height: "100%",
                }}
                src={recipe.mainImageUrl || ""}
              />
            )}
            <MyCard
              elevation={0}
              sx={{
                order: { xs: 2, md: 1 },
                width: "100%",
                gap: 2,
                minHeight: "100%",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: { xs: "none", md: "block" } }}>
                <Typography sx={{ mt: 2, fontWeight: 700 }} variant={matches ? "h4" : "h5"} component="h1">
                  {recipe.title}
                </Typography>
              </Box>
              <Box>
                <MyLabel>Tags</MyLabel>
                <SelectedTags selectedTags={recipe.tags} color="primary" />
              </Box>
            </MyCard>
          </Box>
        </Grid>
        <Grid xs={12} item>
          <Box sx={{ display: "grid", gap: 2, width: "100%", gridTemplateColumns: { xs: "1fr", md: "4fr 3fr" } }}>
            <MyCard sx={{ order: { xs: 2, md: 1 } }}>
              <MyLabel>Recipe</MyLabel>
              <Typography
                sx={{ fontWeight: 500, textAlign: "justify", whiteSpace: "break-spaces" }}
                variant="body1"
                component="pre"
              >
                {recipe.text}
              </Typography>
            </MyCard>
            <MyCard
              sx={{
                order: { xs: 1, md: 2 },
                position: { xs: "flex", md: "sticky" },
                top: 82,
                maxHeight: "calc(100vh - 100px)",
                overflow: "auto",
                left: 0,
                height: "auto",
                alignSelf: "start",
                fontSize: 16,
                fontWeight: 500,
              }}
            >
              <MyLabel>Ingredients</MyLabel>
              {convertToParagraphs(recipe.ingredients)}
            </MyCard>
          </Box>
        </Grid>
        {recipe.images.length > 0 && (
          <Grid xs={12} item>
            <ImageFullscreen selectedURL={selectedURL} setSelectedURL={setSelectedURL} />
            <Carousel
              navigation
              slidesPerView={matches ? 4 : 2}
              spaceBetween={15}
              sx={{ width: "100%", aspectRatio: { xs: "8/3", md: "16/3" } }}
              modules={[Navigation]}
            >
              {recipe.images.map((image) => (
                <SwiperSlide
                  key={image.id}
                  onClick={() => {
                    setSelectedURL(image.imageUrl);
                  }}
                >
                  <Image sx={{ userSelect: "none", width: "100%", height: "100%", zIndex: 100 }} src={image.imageUrl} />
                </SwiperSlide>
              ))}
            </Carousel>
          </Grid>
        )}
        <Grid item xs={12}>
          <Box sx={{ display: "flex", flexWrap: "wrap-reverse", columnGap: 2, rowGap: 1, mt: 1 }}>
            <MyCard
              sx={{
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 1,
                flexGrow: 100,
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", gap: 1 }}>
                <IconButton onClick={() => (isAuth ? triggerLike() : setLoginOpen(true))} size={"small"}>
                  {isLiked ? (
                    <Favorite sx={{ fontSize: 30 }} color="error" />
                  ) : (
                    <FavoriteBorder sx={{ fontSize: 30 }} color="error" />
                  )}
                </IconButton>
                <IconButton onClick={() => (isAuth ? triggerFavorite() : setLoginOpen(true))} size={"small"}>
                  {isInFavorites ? <Bookmark sx={{ fontSize: 30 }} /> : <BookmarkBorder sx={{ fontSize: 30 }} />}
                </IconButton>
              </Box>
              <Box>created: {formatDate(recipe.createdAt)}</Box>
            </MyCard>
            <Box sx={{ display: "flex", gap: 1, pl: 4, flexGrow: 1, alignItems: "center" }}>
              <ClientLink sx={{ ml: "auto" }} to={`/users/${recipe.author.id}`}>
                <UserInfo reversed avatarSize={40} hideEmail user={recipe.author} />
              </ClientLink>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <CommentsSection isAuth={isAuth} setLoginOpen={setLoginOpen} recipe={recipe} />
        </Grid>
      </Grid>

      <UnregisteredDialog open={loginOpen} setIsOpen={setLoginOpen} />
    </Container>
  );
};

export default Recipe;
