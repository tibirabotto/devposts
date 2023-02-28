import React, { useContext, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import Feather from "react-native-vector-icons/Feather";
import { AuthContext } from "../../contexts/auth";
import { Modal } from "react-native";
import {
  Container,
  UploadButton,
  UpLoadText,
  Avatar,
  Name,
  Email,
  Button,
  ButtonText,
  ModalContent,
  ButtonBack,
  Input,
} from "./styles";
import Header from "../../components/Header";

export default function Profile() {

  const { signOut, user, storageUser, setUser } = useContext(AuthContext);
  const [url, setUrl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [input, setInput] = useState(user?.name);

  async function handleUpdateName() {
    if (input === "") {
      return;
    }

    await firestore().collection("users").doc(user.uid).update({
      name: input,
    });

    const postDocs = await firestore()
      .collection("posts")
      .where("userId", "==", user.uid).get();
    postDocs.forEach( async doc => {
      await firestore().collection('posts').doc(doc.id).update({
        author: input
      })
    })
    let data = {
      uid: user.uid,
      name: input,
      email: user.email
    }
    setUser(data)
    storageUser(data);

    setOpenModal(false)
  }

  return (
    <Container>
      <Header />
      {url ? (
        <UploadButton onPress={() => console.log("Nice")}>
          <UpLoadText>+</UpLoadText>
          <Avatar source={{ uri: url }} />
        </UploadButton>
      ) : (
        <UploadButton onPress={() => console.log("Nice")}>
          <UpLoadText>+</UpLoadText>
        </UploadButton>
      )}

      <Name numberOfLines={1}>{user.name}</Name>
      <Email numberOfLines={1}>{user.email}</Email>
      <Button bg="#428cfd" onPress={() => setOpenModal(true)}>
        <ButtonText color="#FFF">Update profile</ButtonText>
      </Button>

      <Button bg="#f1f1f1" onPress={signOut}>
        <ButtonText color="#3b3b3b">Logout</ButtonText>
      </Button>

      <Modal visible={openModal} animationType="slide" transparent={true}>
        <ModalContent>
          <ButtonBack onPress={() => setOpenModal(false)}>
            <Feather name="arrow-left" size={22} color="#121212" />
            <ButtonText color="#121212">Back</ButtonText>
          </ButtonBack>
          <Input
            placeholder={user?.name}
            value={input}
            onChangeText={setInput}
          />
          <Button bg="#428cfd" onPress={handleUpdateName}>
            <ButtonText color="#f1f1f1">Update</ButtonText>
          </Button>
        </ModalContent>
      </Modal>
    </Container>
  );
}
