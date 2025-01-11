import NavBar from "../Components/NavBarFinale"
import FullFeaturedCrudGrid from "../Components/DataGrid"
import { Box } from "@mui/material"

export default function Collections() {
  return (
    <>
      <Box
        sx={{
          backgroundImage: `url("https://cdn.mos.cms.futurecdn.net/SXWyHVjYC6gTGvsdnVcoAT.png")`,
          backgroundRepeat: "repeat",
          backgroundPositionY: "30%",
          backgroundPositionX: "70%",
          backgroundSize: "70%",
          minHeight: "100vh", // Ensure it covers the entire height of the page
        }}
      >
        {/* <NavBar /> */}
        <Box sx={{ padding: 2 }}>
          <FullFeaturedCrudGrid />
        </Box>
      </Box>
    </>
  )
}
