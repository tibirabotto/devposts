import React, { useState, useContext, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import { AuthContext } from "../../contexts/auth";

import { Text, View, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Feather from "react-native-vector-icons/Feather";
import { Container, ButtonPost, ListPosts } from "./styles";

import Header from "../../components/Header";

export default function Home() {
  const navigation = useNavigation();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const subscriber = firestore()
      .collection("posts")
      .orderBy("created", "desc")
      .onSnapshot((snapshot) => {
        const postList = [];
        snapshot.forEach((doc) => {
          postList.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        setPosts(postList);
        setLoading(false);
      });

    return () => subscriber();
  }, []);

  return (
    <Container>
      <Header />
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size={50} color="#e52246" />
        </View>
      ) : (
        <ListPosts data={posts} renderItem={({ item }) => <Text>Teste</Text>} />
      )}

      <ButtonPost onPress={() => navigation.navigate("NewPost")}>
        <Feather name="edit-2" color="#FFF" size={25} />
      </ButtonPost>
    </Container>
  );
}
