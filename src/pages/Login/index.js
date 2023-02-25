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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function toggleLogin() {
    setLogin(!login);
    setName('')
    setEmail('')
    setPassword('')
  }

  function handleSignUp() {
    if (name === '' || email === '' || password === '') {
      alert('Name/Email/Password required')
      return;
    }
    alert("handleSignUp")
  }

  function handleSignIn() {
    if (email === '' || password === '') {
      alert('Email/Password required')
      return;
    }
    alert("handleSignIn")
  }

  if (login) {
    return (
      <Container>
        <Title>
          Dev<Text style={{ color: "#E52246" }}>Post</Text>
        </Title>
        <Input
          placeholder="email@email.com"
          onChangeText={setEmail}
          value={email}
        />
        <Input
          placeholder="*****"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />
        <Button onPress={handleSignIn}>
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
      <Input placeholder="Name" onChangeText={setName}
          value={name} />
     <Input
          placeholder="email@email.com"
          onChangeText={setEmail}
          value={email}
        />
        <Input
          placeholder="*****"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />
      <Button onPress={handleSignUp}>
        <ButtonText>Sign Up</ButtonText>
      </Button>

      <SignUpButton onPress={toggleLogin}>
        <SignUpText>Already have an account?</SignUpText>
      </SignUpButton>
    </Container>
  );
}
