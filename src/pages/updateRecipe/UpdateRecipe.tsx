import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import FormArea from "../../components/FormArea";
import Form from "../../components/UI/Form";
import TextFieldMultiline from "../../components/UI/input/TextFieldMultiline";
import AnimatedAlert from "../../components/UI/AnimatedAlert";
import MyLabel from "../../components/UI/MyLabel";
import OneFileSelect from "../createRecipe/OneFileSelect";
import MultipleImagesSelect from "../createRecipe/MultipleImagesSelect";
import TagsSelect from "../createRecipe/TagsSelect";
import TagsSearch from "../createRecipe/TagsSearch";
import SelectedTags from "../../components/SelectedTags";
import LoadingButton from "../../components/UI/LoadingButton";
import { useGetAllTagsQuery } from "../../app/services/tagsApi";
import { useGetRecipeQuery, useUpdateRecipeMutation } from "../../app/services/recipeApi";
import { Image as ImageType, Tag } from "../../app/types";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { addToSnackBar } from "../../features/snackbar/snackbarSlice";
import { responseErrorCheck } from "../../utils/functions/responseErrorCheck";
import MyButton from "../../components/UI/MyButton";
import DeleteRecipe from "./DeleteRecipe";
import MultipleImages from "../../components/MultipleImages";

type FormFields = {
  title: string;
  text: string;
  ingredients: string;
  mainImage?: File;
  images?: File[];
  imagesId?: string;
  tagsId: string;
};

type Props = {};

const UpdateRecipe = (props: Props) => {
  const { id } = useParams();
  const { data: recipe } = useGetRecipeQuery(id || "");
  const { data: tagCategories } = useGetAllTagsQuery();
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [selectedMainFile, setSelectedMainFile] = useState<File | null>(null);
  const [selectedAddFiles, setSelectedAddFiles] = useState<File[] | null>(null);
  const [selectedRemImages, setSelectedRemImages] = useState<ImageType[] | null>(null);
  const [updateRecipe, { isLoading: isUpdateLoading, error: updateRecipeError }] = useUpdateRecipeMutation();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const {
    register,
    setValue,
    handleSubmit,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>();

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
    if (!recipe) return;
    if (selectedMainFile) {
      data.mainImage = selectedMainFile;
    }
    if (selectedAddFiles) {
      data.images = selectedAddFiles;
    }
    if (selectedRemImages) {
      data.imagesId = JSON.stringify(selectedRemImages.map((image) => image.id));
    }
    if (selectedTags) {
      data.tagsId = JSON.stringify(selectedTags.map((tag) => tag.id));
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("text", data.text);
    formData.append("ingredients", data.ingredients);
    if (data.mainImage) {
      formData.append("mainImage", data.mainImage);
    }

    if (data.images && data.images.length) {
      data.images.forEach((image) => {
        formData.append(`images`, image);
      });
    }
    if (data.imagesId) {
      formData.append("imagesId", data.imagesId);
    }
    formData.append("tagsId", data.tagsId);
    const res = await updateRecipe({ id: recipe.id, data: formData });
    if (!res.error) {
      dispatch(addToSnackBar({ livingTime: 2000, severity: "success", text: "You have successfully updated recipe." }));
      navigate("/current/recipes");
    }
  };

  const removeSelectedImage = (e: React.MouseEvent<SVGSVGElement, MouseEvent>, image: string) => {
    e.stopPropagation();
    if (!selectedRemImages) return;
    setSelectedRemImages(selectedRemImages.filter((selectedImage) => selectedImage.imageUrl !== image));
  };

  useEffect(() => {
    if (!recipe) return;
    setSelectedRemImages(recipe.images);
    setSelectedTags(recipe.tags);
  }, [recipe]);

  return (
    <Box
      sx={{
        py: 5,
      }}
    >
      <FormArea startWidth={600} sx={{ display: "flex" }}>
        <Stack direction={"row"} flexWrap={"wrap"} columnGap={2} rowGap={1} justifyContent={"space-between"}>
          <Typography variant="h4" component="h1">
            Update recipe
          </Typography>
          <DeleteRecipe recipe={recipe} />
        </Stack>
        <Form
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 2, display: "flex", gap: 4, flexDirection: "column", width: "100%" }}
        >
          <Stack spacing={1}>
            <MyLabel>Title</MyLabel>
            <TextFieldMultiline
              formValue={[setValue, "title"]}
              startValue={recipe?.title}
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
              formValue={[setValue, "ingredients"]}
              startValue={recipe?.ingredients}
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
              formValue={[setValue, "text"]}
              startValue={recipe?.text}
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

          <Stack spacing={0.5}>
            <MyLabel>Main Image</MyLabel>
            <OneFileSelect
              startImageUrl={recipe?.mainImageUrl || undefined}
              selectedFile={selectedMainFile}
              setSelectedFile={setSelectedMainFile}
              inputText="Choose main image"
            />
            <AnimatedAlert open={!!errors.mainImage?.message} severity="error">
              {errors.mainImage?.message}
            </AnimatedAlert>
          </Stack>

          <Stack {...register("images")} spacing={0.5}>
            {selectedRemImages && selectedRemImages.length > 0 && (
              <>
                <MyLabel>Previous images</MyLabel>
                <MultipleImages
                  imagesUrl={selectedRemImages?.map((image) => image.imageUrl)}
                  removeFunction={removeSelectedImage}
                />
              </>
            )}
            <MyLabel>
              New Images
              <Typography sx={{ ml: 1, fontWeight: 700 }} component={"span"}>
                {selectedAddFiles?.length || 0} / {10 - (selectedRemImages?.length || 0)}
              </Typography>
            </MyLabel>
            <MultipleImagesSelect
              maxImages={10 - (selectedRemImages?.length || 0)}
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
            <AnimatedAlert sx={{ mb: 1 }} severity="error" open={responseErrorCheck(updateRecipeError)}>
              {responseErrorCheck(updateRecipeError) && updateRecipeError.data.error}
            </AnimatedAlert>
            <Stack direction={"row"} justifyContent={"flex-end"} columnGap={2} rowGap={1}>
              <MyButton onClick={() => navigate(-1)} type="button" variant="outlined">
                Cancel
              </MyButton>
              <LoadingButton isLoading={isUpdateLoading} type="submit" variant="contained">
                Update recipe
              </LoadingButton>
            </Stack>
          </Stack>
        </Form>
      </FormArea>
    </Box>
  );
};

export default UpdateRecipe;
