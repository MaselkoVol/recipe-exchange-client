import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Form from "../../components/UI/Form";
import { useColors } from "../../hooks/useColors";
import TextFieldMultiline from "../../components/UI/input/TextFieldMultiline";
import AnimatedAlert from "../../components/UI/AnimatedAlert";
import MultipleImagesSelect from "../createRecipe/MultipleImagesSelect";
import MyButton from "../../components/UI/MyButton";
import LoadingButton from "../../components/UI/LoadingButton";
import MyCard from "../../components/UI/MyCard";
import { Comment, Recipe } from "../../app/types";
import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useLazyGetCommentsQuery,
} from "../../app/services/commentApi";
import { useDispatch } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";
import { addToSnackBar } from "../../features/snackbar/snackbarSlice";
import { Send } from "@mui/icons-material";
import ImageFullscreen from "../../components/UI/ImageFullscreen";
import UserComment from "./UserComment";
import { motion } from "framer-motion";
import LoadingPage from "../loadingPage/LoadingPage";

type CommentForm = {
  text: string;
  images?: File[];
};

type Props = {
  recipe?: Recipe;
  isAuth: boolean;
  setLoginOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CommentsSection = ({ recipe, isAuth, setLoginOpen }: Props) => {
  const [isCommentFieldOpen, setIsCommentFiledOpen] = useState(false);
  const [selectedCommentImages, setSelectedComemntImages] = useState<File[] | null>(null);
  const [createComment, { isLoading, isError }] = useCreateCommentMutation();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CommentForm>();

  const [selectedURL, setSelectedURL] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(999);
  const page = useRef(1);

  const [userComments, setUserComments] = useState<Comment[]>([]);
  const [otherComments, setOtherComments] = useState<Comment[]>([]);
  const [getComments, { data, isLoading: isCommentsLoading, isError: isCommentsError }] = useLazyGetCommentsQuery();

  const getCommentsWrapper = () => {
    if (!recipe?.id) return;
    getComments({ recipeId: recipe.id, "comments-limit": "10", "comments-page": page.current.toString() });
    page.current += 1;
  };

  const onSubmit: SubmitHandler<CommentForm> = async (data) => {
    reset();
    setSelectedComemntImages(null);
    if (!recipe?.id) return;

    if (selectedCommentImages) {
      data.images = selectedCommentImages;
    }
    const formData = new FormData();
    formData.append("text", data.text);
    if (data.images && data.images.length) {
      data.images.forEach((image) => {
        formData.append("images", image);
      });
    }
    const res = await createComment({ data: formData, recipeId: recipe.id });

    if (res.error) {
      dispatch(
        addToSnackBar({ livingTime: 2000, severity: "error", text: "Something went wrong during comment creation" })
      );
    } else {
      getCommentsWrapper();
      dispatch(
        addToSnackBar({ livingTime: 2000, severity: "success", text: "You have successfully created comment." })
      );
    }
  };

  const lastElementRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!lastElementRef.current) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        getCommentsWrapper();
      }
    });
    observer.observe(lastElementRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);
  useEffect(() => {
    if (!data) return;
    const comments = data.comments;
    setUserComments(comments.userComments);
    setOtherComments([...otherComments, ...comments.otherComments]);
    setTotalPages(data.meta.totalPages);
  }, [data]);

  // callback to delete the comment
  const [deleteComment, { isLoading: isDeleteLoading, isError: isDeleteError }] = useDeleteCommentMutation();
  const handleDelete = async (comment: Comment) => {
    if (!recipe?.id || !comment.id) return;
    const res = await deleteComment({ recipeId: recipe.id, commentId: comment.id });
    if (res.error) {
      dispatch(addToSnackBar({ livingTime: 2000, severity: "error", text: "Sorry, we couldn't delete your comment." }));
    } else {
      getCommentsWrapper();
      dispatch(
        addToSnackBar({ livingTime: 2000, severity: "success", text: "You have successfully deleted your comment." })
      );
    }
    getCommentsWrapper();
  };

  const colors = useColors();
  return (
    <Stack spacing={4} sx={{ pt: 2 }}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Typography variant={"h4"} sx={{ color: colors.contrast }}>
            Comments
          </Typography>
          <TextFieldMultiline
            {...register("text", {
              required: "RecipeTextIsRequired",
            })}
            onClick={() => setIsCommentFiledOpen(true)}
            fullWidth
            isContrast
            label="Write a comment"
          />
          <Stack
            spacing={1}
            sx={{
              display: isCommentFieldOpen ? "flex" : "none",
            }}
          >
            <AnimatedAlert open={!!errors.text?.message} severity="error">
              {errors.text?.message}
            </AnimatedAlert>
            <MyCard
              sx={{
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "space-between",
                columnGap: 8,
                rowGap: 2,
                alignItems: "flex-end",
              }}
            >
              <MultipleImagesSelect
                maxImages={5}
                sx={{ flex: 1, width: "100%", alignSelf: { md: "stretch" } }}
                selectedFiles={selectedCommentImages}
                setSelectedFiles={setSelectedComemntImages}
                inputText="Add images"
              />
              <Box
                sx={{
                  ml: "auto",
                  display: "flex",
                  gap: 2,
                  justifyContent: "flex-end",
                }}
              >
                <MyButton variant="text" onClick={() => setIsCommentFiledOpen(false)}>
                  Cancel
                </MyButton>
                <LoadingButton
                  onClick={(e) => {
                    if (!isAuth) {
                      e.preventDefault();
                      setLoginOpen(true);
                    }
                  }}
                  type="submit"
                  isLoading={isLoading}
                  variant="contained"
                >
                  <Send sx={{ mt: 0.5, mb: -0.5, mx: 2 }} />
                </LoadingButton>
              </Box>
            </MyCard>
          </Stack>
        </Stack>
      </Form>
      {userComments.length === 0 && otherComments.length === 0 && <Typography variant="h6">No comments yet</Typography>}
      {userComments.length > 0 &&
        userComments.map((comment, idx) => (
          <UserComment
            recipe={recipe}
            getComments={getCommentsWrapper}
            key={idx}
            comment={comment}
            setSelectedURL={setSelectedURL}
          />
        ))}

      {otherComments.length > 0 &&
        otherComments.map((comment, idx) => (
          <UserComment key={idx} comment={comment} setSelectedURL={setSelectedURL} />
        ))}
      {totalPages >= page.current && (
        <motion.div onViewportEnter={getCommentsWrapper}>
          <LoadingPage sx={{ my: 2, mx: "auto" }} />
        </motion.div>
      )}
      <ImageFullscreen selectedURL={selectedURL} setSelectedURL={setSelectedURL} />
    </Stack>
  );
};

export default CommentsSection;
