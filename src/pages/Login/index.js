import React, { useState } from "react";
import { Text } from "react-native";
import {
  Container,
  Title,
  Input,
  Button,
  ButtonText,
  SignUpButton,
  SignUpText,
} from "./styles";

export default function Login() {
  const [login, setLogin] = useState(true);

  function toggleLogin() {
    setLogin(!login);
  }


  if (login) {
    return (
      <Container>
        <Title>
          Dev<Text style={{ color: "#E52246" }}>Post</Text>
        </Title>
        <Input placeholder="email@email.com" />
        <Input placeholder="*****" secureTextEntry />
        <Button onPress={() => console.log("Sign In")}>
          <ButtonText>Sign In</ButtonText>
        </Button>

        <SignUpButton onPress={toggleLogin}>
          <SignUpText>Create an account</SignUpText>
        </SignUpButton>
      </Container>
    );
  }

  return (
    <Container>
      <Title>
        Dev<Text style={{ color: "#E52246" }}>Post</Text>
      </Title>
      <Input placeholder="Name" />
      <Input placeholder="email@email.com" />
      <Input placeholder="*****" secureTextEntry />
      <Button onPress={() => console.log("Sign In")}>
        <ButtonText>Sign Up</ButtonText>
      </Button>

      <SignUpButton onPress={toggleLogin}>
        <SignUpText>Already have an account?</SignUpText>
      </SignUpButton>
    </Container>
  );
}
