// import React, { Component } from 'react';
// import { View, Button, Image } from 'react-native';
// import ImagePicker from 'react-native-image-picker';

// class ImageUploadScreen extends Component {
//     state = {
//       selectedImage: null,
//     };
  
//     handleSelectImage = () => {
//       const options = {
//         title: 'Select Image',
//         storageOptions: {
//           skipBackup: true,
//           path: 'images',
//         },
//       };
  
//       ImagePicker.showImagePicker(options, (response) => {
//         if (response.didCancel) {
//           console.log('User cancelled image selection');
//         } else if (response.error) {
//           console.log('ImagePicker Error: ', response.error);
//         } else {
//           const selectedImage = { uri: response.uri };
//           this.setState({ selectedImage });
//           this.uploadImage(response.uri); // Upload the selected image
//         }
//       });
//     };
  
//     uploadImage = async (imageUri) => {
//       // Your code to upload the image using fetch goes here
//       // Modify the fetch request based on your API endpoint and headers
//     };
  
//     render() {
//       const { selectedImage } = this.state;
  
//       return (
//         <View>
//           <Button title="Select Image" onPress={this.handleSelectImage} />
//           {selectedImage && <Image source={selectedImage} style={{ width: 200, height: 200 }} />}
//         </View>
//       );
//     }
//   }
  
//   export default ImageUploadScreen;
  