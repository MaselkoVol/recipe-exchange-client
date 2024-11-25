import React, { useEffect, useState } from "react";
import FormArea from "../../components/FormArea";
import { Box, Chip, Stack, TextField, Typography } from "@mui/material";
import Form from "../../components/UI/Form";
import { useGetAllTagsQuery } from "../../app/services/tagsApi";
import { Tag } from "../../app/types";
import TagsSelect from "./TagsSelect";
import TagsSearch from "./TagsSearch";
import OneFileSelect from "./OneFileSelect";
import MultipleImagesSelect from "./MultipleImagesSelect";
import { SubmitHandler, useForm } from "react-hook-form";
import AnimatedAlert from "../../components/UI/AnimatedAlert";
import { useCreateRecipeMutation } from "../../app/services/recipeApi";
import { useNavigate } from "react-router-dom";
import { useColors } from "../../hooks/useColors";
import MyTextField from "../../components/UI/input/MyTextField";
import LoadingButton from "../../components/UI/LoadingButton";
import { responseErrorCheck } from "../../utils/functions/responseErrorCheck";
import { useDispatch } from "react-redux";
import { addToSnackBar } from "../../features/snackbar/snackbarSlice";
import MyLabel from "../../components/UI/MyLabel";
import SelectedTags from "../../components/SelectedTags";
import TextFieldMultiline from "../../components/UI/input/TextFieldMultiline";

type Props = {};

type FormFields = {
  title: string;
  text: string;
  ingredients: string;
  mainImage: File;
  images?: File[];
  tagsId: string;
};

const CreateRecipe = (props: Props) => {
  const { data: tagCategories, isLoading: isTagsLoading, error: tagError } = useGetAllTagsQuery();
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [selectedMainFile, setSelectedMainFile] = useState<File | null>(null);
  const [selectedAddFiles, setSelectedAddFiles] = useState<File[] | null>(null);
  const [createRecipe, { error: createRecipeError, isLoading }] = useCreateRecipeMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>();

  // validation of main image
  useEffect(() => {
    if (errors.mainImage && selectedMainFile) {
      clearErrors("mainImage");
    }
  }, [selectedMainFile]);

  const validateMainImage = () => {
    if (!selectedMainFile) return "Main image is required";
    return true;
  };

  // validation of tags
  useEffect(() => {
    if (errors.tagsId && selectedTags) {
      clearErrors("tagsId");
    }
  }, [selectedTags]);

  const validateTags = () => {
    if (!selectedTags || selectedTags.length < 1) return "Select at least 1 tag";
    return true;
  };

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    if (selectedMainFile) {
      data.mainImage = selectedMainFile;
    }
    if (selectedAddFiles) {
      data.images = selectedAddFiles;
    }
    if (selectedTags) {
      data.tagsId = JSON.stringify(selectedTags.map((tag) => tag.id));
    }
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("text", data.text);
    formData.append("ingredients", data.ingredients);
    formData.append("mainImage", data.mainImage);

    if (data.images && data.images.length) {
      data.images.forEach((image) => {
        formData.append(`images`, image);
      });
    }

    formData.append("tagsId", data.tagsId);
    const res = await createRecipe(formData);
    if (!res.error) {
      dispatch(addToSnackBar({ livingTime: 2000, severity: "success", text: "You have successfully created recipe." }));
      navigate("/current/recipes");
    }
  };

  return (
    <Box
      sx={{
        py: 5,
      }}
    >
      <FormArea startWidth={600} sx={{ display: "flex" }}>
        <Typography variant="h4" component="h1">
          Create recipe
        </Typography>
        <Form
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 2, display: "flex", gap: 4, flexDirection: "column", width: "100%" }}
        >
          <Stack spacing={1}>
            <MyLabel>Title</MyLabel>
            <TextFieldMultiline
              rows={2}
              {...register("title", {
                required: "Title is required",
              })}
              label="Title"
            />
            <AnimatedAlert open={!!errors.title?.message} severity="error">
              {errors.title?.message}
            </AnimatedAlert>
          </Stack>

          <Stack spacing={1}>
            <MyLabel>Ingredients</MyLabel>
            <TextFieldMultiline
              rows={2}
              {...register("ingredients", {
                required: "Ingredients are required",
              })}
              label="Ingredients"
            />

            <AnimatedAlert open={!!errors.ingredients?.message} severity="error">
              {errors.ingredients?.message}
            </AnimatedAlert>
          </Stack>

          <Stack spacing={1}>
            <MyLabel>Recipe</MyLabel>
            <TextFieldMultiline
              rows={4}
              {...register("text", {
                required: "Recipe is required",
              })}
              label="Recipe"
            />
            <AnimatedAlert open={!!errors.text?.message} severity="error">
              {errors.text?.message}
            </AnimatedAlert>
          </Stack>

          <Stack
            {...register("mainImage", {
              validate: validateMainImage,
            })}
            spacing={0.5}
          >
            <MyLabel>Main Image</MyLabel>
            <OneFileSelect
              selectedFile={selectedMainFile}
              setSelectedFile={setSelectedMainFile}
              inputText="Choose main image"
            />
            <AnimatedAlert open={!!errors.mainImage?.message} severity="error">
              {errors.mainImage?.message}
            </AnimatedAlert>
          </Stack>

          <Stack {...register("images")} spacing={0.5}>
            <MyLabel>
              Additional Images
              <Typography sx={{ ml: 1, fontWeight: 700 }} component={"span"}>
                {selectedAddFiles?.length || 0} / 10
              </Typography>
            </MyLabel>
            <MultipleImagesSelect
              maxImages={10}
              allowedTypes="image/jpeg, image/png, image/webp, image/jpg"
              selectedFiles={selectedAddFiles}
              setSelectedFiles={setSelectedAddFiles}
              inputText="Choose additional images"
            />
          </Stack>

          <Stack
            {...register("tagsId", {
              validate: validateTags,
            })}
            spacing={1}
          >
            <MyLabel>Tags</MyLabel>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                columnGap: 3,
                rowGap: 1.3,
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <TagsSelect
                sx={{ minWidth: 150, display: "flex", flexDirection: "column", flex: 10, alignSelf: "stretch" }}
                tagCategories={tagCategories}
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
              />
              <Box sx={{ minWidth: 200, flex: 9 }}>
                <TagsSearch
                  tagCategories={tagCategories}
                  selectedTags={selectedTags}
                  setSelectedTags={setSelectedTags}
                />
              </Box>
            </Box>
            <SelectedTags selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
            <AnimatedAlert open={!!errors.tagsId?.message} severity="error">
              {errors.tagsId?.message}
            </AnimatedAlert>
          </Stack>
          <Stack>
            <AnimatedAlert sx={{ mb: 1 }} severity="error" open={responseErrorCheck(createRecipeError)}>
              {responseErrorCheck(createRecipeError) && createRecipeError.data.error}
            </AnimatedAlert>
            <LoadingButton isLoading={isLoading} type="submit" variant="contained">
              Create recipe
            </LoadingButton>
          </Stack>
        </Form>
      </FormArea>
    </Box>
  );
};

export default CreateRecipe;
