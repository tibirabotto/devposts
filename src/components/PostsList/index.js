import React from "react";
import { View, Text } from "react-native";
import {formatDistance} from 'date-fns'
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
import MaterialCommunityIcons from "react-native-vector-icons//MaterialCommunityIcons";
export default function PostsList({ data, userId }) {

  function formatTimePost() {
    const datePost = new Date(data.created.seconds * 1000)
    return formatDistance(
      new Date(),
      datePost
    )
  }

  return (
    <Container>
      <Header>
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
        <LikeButton>
          <Like>
            {data?.like === 0 ? '' : data?.like }
          </Like>
          <MaterialCommunityIcons
            name={data?.like === 0 ? 'heart-plus-outline' : 'cards-heart'}
            size={20}
            color="#e52246"
          />
        </LikeButton>

        <TimePost>{formatTimePost()}</TimePost>
      </Actions>
    </Container>
  );
}
