import React from "react";
import {
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  VStack,
  HStack,
  IconButton,
  Image,
} from "@chakra-ui/react";
import { DeleteIcon, StarIcon } from "@chakra-ui/icons";

export default function MakanForm({ dish, updateForm, onDelete, isEdit }) {
  console.log(`dish`, dish);
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    console.log(evt);
    let UPDATED = updateForm({ [name]: value });
    console.log(`UPDATED IS`, UPDATED);
  };

  const handleRatingChange = (newRating) => {
    updateForm({ rating: newRating });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    // file validation
  if (file && file.type.substr(0, 5) === "image") {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ml_default'); 

    // should add loader here
    
    // when user uploads photo, post it to cloudinary
    fetch('https://api.cloudinary.com/v1_1/dxn0qasmg/image/upload', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        // update lifted state with image
        updateForm({ image_url: data.secure_url });
        // once done can remove loader
      })
      .catch(error => {
        console.error('Error:', error);
        // here also since error
      });
  } else {
    console.error('Invalid file type');
  }
};

  return (
    <VStack spacing={3} align="stretch">
      <HStack justify="space-between">
        <FormLabel fontSize="sm" mb={1}>
          Dish name
        </FormLabel>
        {!isEdit && (
          <IconButton
            icon={<DeleteIcon color="red" />}
            size="sm"
            colorScheme="white"
            onClick={onDelete}
            aria-label="Delete Makan Form"
          />
        )}
      </HStack>
      <Input
        name="name"
        placeholder={dish.name || "Enter dish name. (as menu)}"}
        readOnly={isEdit}
        onChange={handleChange}
        size="sm"
      />
       <Input name="image_url" type="file" onChange={handleImageUpload} accept="image/*" />
       {dish.image_url && <Image cloudName="your_cloud_name" publicId={dish.image_url} width="300" crop="scale" />}

      <HStack spacing={4}>
        <InputGroup size="sm">
          <InputLeftElement
            pointerEvents="none"
            color="gray.300"
            fontSize="1em"
            children="$"
          />
          <Input
            name="price"
            type="number"
            placeholder={dish.price || "0.00"}
            onChange={handleChange}
          />
        </InputGroup>
        <HStack>
          {[1, 2, 3, 4, 5].map((star) => (
            <StarIcon
              key={star}
              color={star <= (dish.rating || 0) ? "yellow.400" : "gray.300"}
              onClick={() => handleRatingChange(star)}
              cursor="pointer"
            />
          ))}
        </HStack>
      </HStack>

      <Textarea
        name="comments"
        placeholder={dish.comments || "Enter comments"}
        onChange={handleChange}
        size="sm"
      />
    </VStack>
  );
}
