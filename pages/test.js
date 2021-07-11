import Layout from "../components/Layout";
import Link from "../src/Link";
import {
  Button,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import ImgMediaCard from "../components/card";

export default function Home() {
  return (
    <Container maxWidth="sm">
      <Layout>
        <Box my={4}>
          <h1>aaa</h1>
          <Typography variant="h4" component="h1" gutterBottom>
            Next.js example
          </Typography>
          <Link href="/" color="secondary">
            Go to the about page
          </Link>
        </Box>
        <Box
          display="flex"
          flexWrap="wrap"
          p={1}
          m={1}
          bgcolor="background.paper"
          css={{ maxWidth: 1500 }}
        >
          <Box p={1}>
            <ImgMediaCard video="aaa" />
          </Box>
          <Box p={1}>
            <ImgMediaCard video="aaa" />
          </Box>
          <Box p={1} bgcolor="grey.300">
            Item 3
          </Box>
          <Box p={1} bgcolor="grey.300">
            Item 4
          </Box>
          <Box p={1} bgcolor="grey.300">
            Item 5
          </Box>
          <Box p={1} bgcolor="grey.300">
            Item 6
          </Box>
        </Box>
      </Layout>
    </Container>
  );
}
