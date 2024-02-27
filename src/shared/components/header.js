import { Box, Button, Stack } from "@mui/material";
import gridmarket from "../../assets/gridmarket.svg";

export default function Header(){
    let buttonStyle = {
        textTransform: 'none',
        fontSize: 'medium'
    }
    return(
        <Stack direction={'row'} justifyContent='space-between' sx={{background: '#F3F7F7', p: '13px 16px'}}>
            <Box component="img" sx={{height: '30px', width: '292px'}} src={gridmarket}/>
            <Stack direction={'row'} spacing={2}>
                <Button onClick={() => window.open(`https://gridmarket.com/contact/`, '_blank')} variant="text" sx={buttonStyle}>
                    Contact us
                </Button>
                <Button onClick={() => window.open(`https://platform.gridmarket.com/login`, '_blank')} variant="contained" sx={buttonStyle}>
                    Login or Register
                </Button>
            </Stack>
        </Stack>
    )
}