import {
  Avatar,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { forwardRef, useState } from "react";
import ClientLink from "../../components/UI/ClientLink";
import Image from "../../components/UI/Image";
import { useColors } from "../../hooks/useColors";
import { Comment, Recipe } from "../../app/types";
import Carousel from "../../components/UI/Carousel";
import { SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel, Scrollbar } from "swiper/modules";
import { formatDate } from "../../utils/functions/formatDate";
import { DeleteOutline } from "@mui/icons-material";
import MyButton from "../../components/UI/MyButton";
import LoadingButton from "../../components/UI/LoadingButton";
import { useDeleteCommentMutation } from "../../app/services/commentApi";
import { addToSnackBar } from "../../features/snackbar/snackbarSlice";
import { useDispatch } from "react-redux";

type Props = {
  comment: Comment;
  setSelectedURL: React.Dispatch<React.SetStateAction<string | null>>;
  getComments?: (...args: any) => any;
  recipe?: Recipe;
};
const UserComment = forwardRef<HTMLDivElement, Props>(({ comment, setSelectedURL, recipe, getComments }, ref) => {
  const colors = useColors();
  const [isDelOpen, setIsDelOpen] = useState(false);
  const dispatch = useDispatch();

  const [deleteComment, { isLoading }] = useDeleteCommentMutation();
  const handleDelete = async () => {
    if (!recipe?.id || !comment.id || !getComments) return;
    const res = await deleteComment({ recipeId: recipe.id, commentId: comment.id });
    setIsDelOpen(false);
    if (res.error) {
      dispatch(addToSnackBar({ livingTime: 2000, severity: "error", text: "Sorry, we couldn't delete your comment." }));
    } else {
      getComments();
      dispatch(
        addToSnackBar({ livingTime: 2000, severity: "success", text: "You have successfully deleted your comment." })
      );
    }
  };
  return (
    <Stack ref={ref} key={comment.id} direction={"row"} justifyContent={"space-between"} spacing={2}>
      <Stack spacing={0.5} direction={"row"} sx={{ overflow: "hidden" }}>
        <Avatar sx={{ width: 50, bgcolor: colors.grey, height: 50 }} src={comment.user.avatarUrl} />
        <Stack spacing={0.5} sx={{ overflow: "hidden" }}>
          <Stack direction={"row"} spacing={2} alignItems={"flex-end"}>
            <ClientLink to={`/users/${comment.user.id}`}>{comment.user.name}</ClientLink>
            <Typography variant="caption">{formatDate(comment.createdAt)}</Typography>
          </Stack>
          <Typography>{comment.text}</Typography>
          {comment.images.length > 0 && (
            <Carousel
              sx={{ cursor: "grab", userSelect: "none" }}
              freeMode
              mousewheel
              slidesPerView={"auto"}
              spaceBetween={5}
              modules={[FreeMode, Mousewheel, Scrollbar]}
            >
              {comment.images.map((image, idx) => (
                <SwiperSlide key={idx} style={{ width: "auto" }}>
                  <Box
                    onClick={(e) => setSelectedURL(image.imageUrl)}
                    sx={{
                      width: 100,
                      border: `1px dashed ${colors.palette.mode === "dark" ? "white" : colors.palette.primary.main}`,
                      position: "relative",
                      "&:hover": {
                        ".icon-button": {
                          opacity: 1,
                          pointerEvents: "all",
                        },
                      },
                    }}
                  >
                    <Image draggable="false" src={image.imageUrl} sx={{ userSelect: "none", aspectRatio: "3/2" }} />
                  </Box>
                </SwiperSlide>
              ))}
            </Carousel>
          )}
        </Stack>
      </Stack>
      {getComments && recipe && (
        <Stack direction={"row"} alignItems={"flex-start"} justifyContent={"center"}>
          <IconButton color="primary" onClick={() => setIsDelOpen(true)} size="large">
            <DeleteOutline />
          </IconButton>
        </Stack>
      )}
      <Dialog
        sx={{ mx: "auto", maxWidth: 400 }}
        open={isDelOpen}
        onClose={() => setIsDelOpen(false)}
        aria-labelledby="logout"
      >
        <DialogTitle>Delete comment </DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete your comment?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <MyButton color="info" sx={{ m: 1 }} onClick={() => setIsDelOpen(false)}>
            Cancel
          </MyButton>
          <LoadingButton
            isLoading={isLoading}
            sx={{ m: 1 }}
            variant="outlined"
            color="error"
            onClick={handleDelete}
            autoFocus
          >
            Delete
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Stack>
  );
});

export default UserComment;
