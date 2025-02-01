import classes from "./App.module.css";
import { Header } from "./components/header/Header";
import { Center, Container } from "@mantine/core";

function App() {
  return (
    <>
      <Header />
      <Container>
        <Center>
          <div className={classes.root}>
            <h1>Easy Bullet Journal</h1>
            <p className={classes.tagline}>
              The journalling app for people that get shit done.
            </p>
          </div>
        </Center>
      </Container>
    </>
  );
}

export default App;
