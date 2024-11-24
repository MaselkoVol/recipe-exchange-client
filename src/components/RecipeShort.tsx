import { Box, Card, Chip, IconButton, Stack, Typography } from "@mui/material";
import React, { useRef } from "react";
import { useColors } from "../hooks/useColors";
import Image from "./UI/Image";
import { hexToRGB } from "../utils/functions/colorFunctions";
import { Favorite, Settings, Visibility } from "@mui/icons-material";
import ClientLink from "./UI/ClientLink";
import MyButton from "./UI/MyButton";
import { RecipeShortInfo } from "../app/types";
import { formatDate } from "../utils/functions/formatDate";
import MyCard from "./UI/MyCard";
import SelectedTags from "./SelectedTags";
import { useInView, motion } from "framer-motion";
import Carousel from "./UI/Carousel";
import { SwiperSlide } from "swiper/react";
import { FreeMode, Scrollbar, Mousewheel } from "swiper/modules";
import { useNavigate } from "react-router-dom";

type Props = {
  recipe: RecipeShortInfo;
  animated?: boolean;
  editable?: boolean;
};

const RecipeShort = ({ recipe, editable = false, animated = false }: Props) => {
  const colors = useColors();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: "some" });
  const navigate = useNavigate();
  const recipeShort = (
    <MyCard>
      <Stack direction={"row"} justifyContent={"space-between"} alignItems={"flex-start"}>
        <Typography variant="h5" component="h4">
          {recipe.title}
        </Typography>
        {editable && (
          <IconButton onClick={() => navigate(`/recipes/${recipe.id}/update`)} size="medium">
            <Settings />
          </IconButton>
        )}
      </Stack>
      {recipe.mainImageUrl && (
        <Image
          sx={{
            my: 1,
            borderRadius: 1,
            overflow: "hidden",
            width: "100%",
            aspectRatio: "4/3",
          }}
          src={recipe.mainImageUrl}
        />
      )}
      <Box
        sx={{
          display: "flex",
          position: "relative",
          gap: 1,
          overflow: "hidden",
        }}
      >
        <Carousel
          sx={{ cursor: "grab", userSelect: "none" }}
          freeMode
          mousewheel
          slidesPerView={"auto"}
          spaceBetween={5}
          modules={[FreeMode, Mousewheel, Scrollbar]}
        >
          {recipe.tags &&
            recipe.tags[0] &&
            recipe.tags.map((tag) => (
              <SwiperSlide key={tag.id} style={{ width: "auto" }}>
                <Chip color={"primary"} label={tag.name} key={tag.id} />
              </SwiperSlide>
            ))}
          <Box
            sx={{
              position: "absolute",
              right: 0,
              top: 0,
              height: "100%",
              width: 20,
              background: `linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(${hexToRGB(colors.bg)},1) 100%)`,
            }}
          ></Box>
        </Carousel>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          columnGap: 2,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            {recipe.likesCount}
            <Favorite color="error" />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            {recipe.views}
            <Visibility />
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: { xs: "100%", md: "auto" },
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            created: {formatDate(recipe.createdAt)}
          </Box>
          <ClientLink sx={{ flexShrink: 0, display: "inline-block" }} to={`/recipes/${recipe.id}`}>
            <MyButton variant="outlined">See more</MyButton>
          </ClientLink>
        </Box>
      </Box>
    </MyCard>
  );

  return animated ? (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.2 }}
    >
      {recipeShort}
    </motion.div>
  ) : (
    recipeShort
  );
};

export default RecipeShort;
