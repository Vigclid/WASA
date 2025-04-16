import { Box, Container } from "@mui/material"
import { Navigation } from "./navbar/Navigation"
import { Preview } from "./ProductPreview/Preview"
import ScrollTextSection from "./product/ScrollTextSection"


export const MainPage = () => {


    return (
        <Box className="w-100">
            <Box>
                <Navigation />
                <Preview />
                <ScrollTextSection />
            </Box>
        </Box>
    )
}