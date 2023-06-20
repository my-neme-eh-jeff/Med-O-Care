import { Grid, Typography, Card, Box } from "@mui/material";
import YouTube from "react-youtube";
import "./Home.css";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import { useApp } from "../../Context/app-context";
import CardCarousel from "./CardCarousel";

export default function HomePage() {
  const { exerciseData } = useApp();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingExcersise, setIsLoadingExcersise] = useState(true);
  const [excercise, setExcercise] = useState([]);
  const opts = {
    playerVars: {
      autoplay: 0,
    },
  };
  const dealingWithYoutubeVideo = (e) => {
    setIsLoading(false);
  };

  const getRandomIndex = () => {
    return Math.floor(Math.random() * 1325);
  };

  return (
    <div>
      <div class="buy-med-container">
        <div id="buy-title">
          <Typography
            variant="h6"
            sx={{ color: "#537FE7", fontWeight: "bold" }}
          >
            Buy medicines from..
          </Typography>
        </div>
        <div id="medicine-carousel">
          <CardCarousel />
        </div>
      </div>

      <div class="buy-med-container">
        <Typography
          variant="h6"
          sx={{
            color: "#537FE7",
            fontWeight: "bold",
            // marginBottom: 3,
            // textAlign: "center",
          }}
        >
          Mindful exercise:
        </Typography>

        <div style={{ display: "flex", justifyContent: "center" }}>
          {isLoading && <CircularProgress />}
        </div>
      </div>
      <Grid container justifyContent="center">
        <YouTube
          height="100%"
          width="100%"
          videoId="7KSNmziMqog"
          opts={opts}
          iframeClassName="youtube-exercise"
          onReady={(e) => {
            dealingWithYoutubeVideo(e);
          }}
        />
      </Grid>

      <div class="exercise-container">
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 2, sm: 8, md: 12 }}
          justifyContent="space-around"
          sx={{ pt: 3, pr: 5, pl: 5 }}
        >
          {isLoadingExcersise &&
            Array.from(Array(6)).map((_, index) => {
              let i = getRandomIndex();
              return (
                <Grid item xs={2} sm={4} md={4} key={index}>
                  <Card
                    sx={{
                      borderRadius: 3,
                      border: 2,
                      minWidth: "250px",
                      maxWidth: "350px",
                      height: `${
                        exerciseData[0]?.gifUrl ? `21rem` : `6.25rem`
                      }`,
                    }}
                  >
                    <Box width={"100%"}>
                      <Box top={0} left={0} bottom={0} right={0} sx={{ pl: 5 }}>
                        <img
                          src={exerciseData[i]?.gifUrl}
                          alt="excersise gif"
                          id="exercise-gif"
                        />
                      </Box>
                    </Box>

                    <Box pl={1} textAlign={"center"}>
                      <Typography>
                        <Typography
                          component={"span"}
                          fontWeight={"bold"}
                          display={"inline-block"}
                        >
                          Body Part involved:
                        </Typography>
                        {exerciseData[i]?.bodyPart}
                      </Typography>
                    </Box>

                    <Box pl={3}>
                      <Typography>
                        The exercise is called {exerciseData[i]?.name} &
                        requires{" "}
                        <Typography
                          component={"span"}
                          fontStyle={"italic"}
                          display={"inline-block"}
                        >
                          {exerciseData[i]?.equipment + "."}
                        </Typography>{" "}
                        It targets the{" "}
                        <Typography
                          component={"span"}
                          fontStyle={"italic"}
                          display={"inline-block"}
                        >
                          {exerciseData[i]?.target}
                        </Typography>
                      </Typography>
                    </Box>
                  </Card>
                </Grid>
              );
            })}
        </Grid>
      </div>
    </div>
  );
}