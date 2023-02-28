import React from "react";
import {useNavigation} from '@react-navigation/native'
import { Container, Name } from "./styles";

export default function SearchList({ data }) {
  const navigation = useNavigation();
  return (
    <Container onPress={() => navigation.navigate('PostsUser', { title: data.name, userId: data.id })}>
      <Name>{data.name}</Name>
    </Container>
  );
}
