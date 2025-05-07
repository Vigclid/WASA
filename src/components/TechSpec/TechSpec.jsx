import { Box, Typography, decomposeColor, styled, useMediaQuery } from "@mui/material";
import * as React from 'react';
import Table, { tableClasses } from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        color: theme.palette.common.white,
        backgroundColor: theme.palette.common.black,
    },
    borderBottom: 'none',

}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,

    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
    borderBottom: 'none',
}));


function createData(number, title, desc) {
    return { number, title, desc };
}

const rows = [
    createData('1.0', '[:Compatibility]', ['Apple iOS', 'Android', 'Windows PC']),
    createData('2.0', '[:Dimensions]', ['Width: 158mm', 'Height: 99mm', 'Depth: 54mm']),
    createData('3.0', '[:Weight]', ['Approximately 300 grams (not to exceed 340 grams)']),
    createData('4.0', '[:Tri-Mode Connectivity]', ['Wireless: RF (Radio Frequency) for ultra-low latency', 'BLE', 'Wired: USB-C']),
    createData('5.0', '[:Battery Life]', ['Up to 30 hours of play time(when used without accessories or LED atmospheric lights)']),
    createData('6.0', '[:Charging]', ['USB-C charging port']),
    createData('7.0', '[:Controls]', ['Left/Right Thumbsticks', 'Left/Right Bumpers', 'Left/Right Triggers', 'Directional D-Pad',
        'X, Y, A, B Buttons', 'Menu Button', 'View Button/DRAVOX button', 'Left/Right Back Buttons', 'Pair Button',
    ]),
    createData('8.0', '[:Special Features]', ['Integrated removable hardware wallet', 'Biometric security (fingerprint reader) for transaction approvals',
        'Airgap Switch for wallet security', 'Adaptive mobile phone grip (compatible with major smartphone brands)',
        'Haptic feedback (rotary motor in each side)'
    ]),
    createData('9.0', '[:Durability]', ['IP54 rated enclosure (sweat-proof, splash-resistant)',
        'Drop tested from various heights (0.5m, 1m, 1.5m)'
    ]),
    createData('10.0', '[:Included Accessories]', ['Braided USB-C Cable', 'Protective film for glossy parts and wallet screen']),


];
const TechSpec = () => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box position="relative" mt={20} mb={10} id="Technologies">
            <Typography
                color="white"
                variant="h3"
                textAlign="center"
                fontFamily="Andale Mono, monospace"
                fontWeight={400}
                mb={10}
            >
                Technical <br />
                Specifications
            </Typography>

            {isMobile ? (
                // Mobile layout - Card style
                <Box display="flex" flexDirection="column" gap={4}>
                    {rows.map((row) => (
                        <Paper
                            key={row.title}
                            sx={{
                                backgroundColor: '#1e1e1e',
                                padding: 2,
                                borderRadius: 2,
                                color: 'white',
                            }}
                        >
                            <Typography
                                variant="h6"
                                fontFamily="Andale Mono, monospace"
                                color="rgba(255, 255, 255, 0.7)"
                            >
                                {row.number}. {row.title}
                            </Typography>
                            <ul style={{ paddingLeft: '1rem' }}>
                                {row.desc.map((item, index) => (
                                    <li key={index} style={{ fontFamily: 'Andale Mono, monospace' }}>
                                        <Typography variant="body1" fontFamily="Andale Mono, monospace">
                                            {item}
                                        </Typography>
                                    </li>
                                ))}
                            </ul>
                        </Paper>
                    ))}
                </Box>
            ) : (
                // Desktop layout - Table
                <TableContainer component={Paper} position="relative" sx={{ borderRadius: '0px' }}>
                    <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <StyledTableRow
                                    key={row.title}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <StyledTableCell
                                        component="th"
                                        scope="row"
                                        sx={{ width: '30%', verticalAlign: 'top' }}
                                    >
                                        <Typography
                                            variant="h6"
                                            fontFamily="Andale Mono, monospace"
                                            color="rgba(255, 255, 255, 0.7)"
                                        >
                                            {row.number}
                                        </Typography>
                                    </StyledTableCell>
                                    <StyledTableCell align="left" sx={{ width: '40%', verticalAlign: 'top' }}>
                                        <Typography
                                            variant="h6"
                                            fontFamily="Andale Mono, monospace"
                                            color="rgba(255, 255, 255, 0.7)"
                                        >
                                            {row.title}
                                        </Typography>
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        {row.desc.map((item, index) => (
                                            <li key={index} style={{ fontFamily: 'Andale Mono, monospace' }}>
                                                <Typography fontFamily="Andale Mono, monospace" display="inline" variant="h6">
                                                    {item}
                                                </Typography>
                                            </li>
                                        ))}
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    )
}

export default TechSpec;