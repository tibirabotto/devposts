import React, {useRef} from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";
import { formatDistance } from "date-fns";
import {
  Container,
  Header,
  Avatar,
  Name,
  ContentView,
  Content,
  Actions,
  LikeButton,
  Like,
  TimePost,
} from "./styles";
import * as Animatable from 'react-native-animatable';
const HeartAnimated =  Animatable.createAnimatableComponent(MaterialCommunityIcons);
import MaterialCommunityIcons from "react-native-vector-icons//MaterialCommunityIcons";
import { da } from "date-fns/locale";


export default function PostsList({ data, userId }) {
  const navigation = useNavigation();
  const likeRef = useRef(null);
  function formatTimePost() {
    const datePost = new Date(data.created.seconds * 1000);
    return formatDistance(new Date(), datePost);
  }

  async function handleLike() {
    const docId = `${userId}_${data.id}`;
    likeRef.current.rubberBand();
    const doc = await firestore().collection("likes").doc(docId).get();
    if (doc.exists) {
      await firestore()
        .collection("posts")
        .doc(data.id)
        .update({
          like: data.like - 1,
        });
      await firestore().collection("likes").doc(docId).delete();

      return;
    }

    await firestore().collection('likes').doc(docId).set({
      postId: data.id,
      userId
    })

    await firestore()
        .collection("posts")
        .doc(data.id)
        .update({
          like: data.like + 1,
        });

  }

  return (
    <Container>
      <Header onPress={() => navigation.navigate('PostsUser', {title: data.author, userId: userId})}>
        {data.avatarUrl ? (
          <Avatar source={{ uri: data.avatarUrl }} />
        ) : (
          <Avatar source={require("../../assets/avatar.png")} />
        )}

        <Name>{data?.author}</Name>
      </Header>
      <ContentView>
        <Content>{data?.content}</Content>
      </ContentView>

      <Actions>
        <LikeButton onPress={handleLike}>
          <Like>{data?.like === 0 ? "" : data?.like}</Like>
          <HeartAnimated
            ref={likeRef}
            name={data?.like === 0 ? "heart-plus-outline" : "cards-heart"}
            size={20}
            color="#e52246"
          />
        </LikeButton>

        <TimePost>{formatTimePost()}</TimePost>
      </Actions>
    </Container>
  );
}
