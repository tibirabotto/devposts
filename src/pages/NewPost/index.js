import React, { useState, useLayoutEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { Container, Input, Button, ButtonText } from "./styles";

import storage from "@react-native-firebase/storage";
import firestore from "@react-native-firebase/firestore";

import {AuthContext} from '../../contexts/auth'

export default function NewPost() {
  const [post, setPost] = useState("");
  const navigation = useNavigation();
  const { user } = useContext(AuthContext)

  useLayoutEffect(() => {
    const options = navigation.setOptions({
      headerRight: () => (
        <Button onPress={handlePost}>
          <ButtonText>Share</ButtonText>
        </Button>
      ),
    });
  }, [navigation, post]);

  async function handlePost() {
    if (post === "") {
      alert("Post can not be blank!");
      return;
    }

    let avatarUrl = null;
    try {
      let response = await storage().ref('users').child(user?.uid).getDownloadURL();
      avatarUrl = response;
    } catch (err) {
      avatarUrl = null;
    }

    await firestore().collection("posts").add({
      created: new Date(),
      content: post,
      author: user.name,
      like: 0,
      avatarUrl,
      userId: user.uid
    }).then(() => {
      setPost('')
      console.log("POST WAS CREATED")
    }).catch((err) => {
      console.log(`ERROR POST CREATE: ${err}`)
    })

    navigation.goBack()
  }

  return (
    <Container>
      <Input
        placeholder="what's happening?"
        placeholderTextColor="#DDD"
        multiline={true}
        maxLength={300}
        value={post}
        onChangeText={setPost}
        autoCorrect={false}
      />
    </Container>
  );
}
