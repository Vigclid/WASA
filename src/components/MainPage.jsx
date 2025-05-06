import { Box, Container } from "@mui/material"
import { Navigation } from "./navbar/Navigation"
import { Preview } from "./ProductPreview/Preview"
import ScrollTextSection from "./product/ScrollTextSection"
import TechSpec from "./TechSpec/TechSpec"
import ContractUs from "./ContractUs/ContractUs"
import Footer from "./Footer/Footer"


export const MainPage = () => {


    return (
        <Box className="w-100" id={"Products"}>
            <Box>
                <Navigation />
                <Preview/>
                <ScrollTextSection  />
                <TechSpec/>
                <ContractUs />
                <Footer />
            </Box>
        </Box>
    )
}