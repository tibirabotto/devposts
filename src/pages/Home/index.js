import React, { useState } from "react";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Feather from "react-native-vector-icons/Feather";
import { Container, ButtonPost, ListPosts } from "./styles";

import Header from "../../components/Header";

export default function Home() {
  const navigation = useNavigation();
  const [posts, setPosts] = useState([
    {id: '1', name: 'Tibira'},
    {id: '2', name: 'Lucca'},
    {id: '3', name: 'Gael'},
    {id: '4', name: 'Conceicao'},
  ]);
  return (
    <Container>
      <Header />
      <ListPosts
        data={posts}
        renderItem={({item}) => (<Text>{item.name}</Text>)}
      />
      <ButtonPost onPress={() => navigation.navigate("NewPost")}>
        <Feather name="edit-2" color="#FFF" size={25} />
      </ButtonPost>
    </Container>
  );
}
