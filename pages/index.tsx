import React, { useState, useEffect } from "react";
import Head from "next/head";
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/client";
import {
  Spinner,
  Page,
  Card,
  Stack,
  ButtonGroup,
  Button,
  TextContainer,
  Badge,
} from "@shopify/polaris";

export default function Home() {
  const [session, isLoading] = useSession();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios("/api/allLights")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  if (loading || isLoading)
    return <Spinner accessibilityLabel="Spinner example" size="large" />;
  if (error) return "Error!";

  const lights = data.map((light) => {
    return (
      <Card key={light.label} title={light.label}>
        <Card.Section title={light.label}>
          <TextContainer>
            <p>
              {light.power === "on" ? (
                <Badge status="success">On</Badge>
              ) : (
                <Badge status="critical">Off</Badge>
              )}
            </p>
            <p>
              {light.connected ? (
                <Badge status="success">Connected</Badge>
              ) : (
                <Badge status="critical">Not connected</Badge>
              )}
            </p>
          </TextContainer>
          <Stack distribution="trailing">
            <ButtonGroup>
              <Button>Turn on</Button>
            </ButtonGroup>
          </Stack>
        </Card.Section>
      </Card>
    );
  });

  if (session) {
    console.log(session);
  }

  return (
    <div>
      <Head>
        <title>Lifx | Nemesis</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page>{lights}</Page>
      {!session && (
        <>
          Not signed in <br />
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )}
      {session && (
        <>
          Signed in as {session.user.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}
    </div>
  );
}
