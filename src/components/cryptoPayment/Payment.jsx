import { Backdrop, Box, Button, Card, CardContent, CardMedia, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Select, TextField, Typography, ThemeProvider, createTheme, Dialog, Container, Stack } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from "yup";
import CircularProgress from "@mui/material/CircularProgress";
import './Payment.css';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';
import CryptoPay from './CryptoPay';
import emailjs from "@emailjs/browser";


// Define the custom theme with the desired font family
const theme = createTheme({
    typography: {
        fontFamily: '"Andale Mono", monospace',
    },
});

export default function Payment() {

    const navigate = useNavigate();
    const voucher = useParams();
    const basePrice = 499.99;
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    const [selCountry, setSelCountry] = useState('');
    const [selState, setSelState] = useState('');
    const [selCity, setSelCity] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const [sale, setSale] = useState(basePrice);
    const [discount, setDiscount] = useState(0);

    const [showSuccess, setShowSuccess] = React.useState(false);
    const handleSendEmail = async () => {
        setIsLoading(true);
        const templateParams = {
            from_name: "Dravox Game",
            email: `${formik.values.email}`,
            name: "Dravox Controller",
            units: `${amount}`,
            unit_price: `${basePrice}`,
            line_item_total: `${(basePrice * amount).toFixed(2)}`,
            voucher: `${discount}`,
            save: `${((basePrice * amount) - sale).toFixed(2)}`,
            cost_total: `${sale.toFixed(2)}`,
            phone: `${formik.values.phone}`,
            firstName: `${formik.values.firstName}`,
            lastName: `${formik.values.lastName}`,
            address: `${selCountry} ${selState} ${selCity} ${formik.values.street}`,
            crypto_currency: "USDT",
        };

        await emailjs
            .send(
                `${process.env.REACT_APP_EMAIL_SERVICE_ID}`,    // ví dụ: "service_xxx123"
                `${process.env.REACT_APP_EMAIL_TEMPLATE_ID}`,   // ví dụ: "template_abc456"
                templateParams,
                `${process.env.REACT_APP_EMAIL_PUBLIC_ID}`     // ví dụ: "Q4rXXXX9gY"
            )
            .then((result) => {
                setShowSuccess(true);
                setTimeout(() => navigate(`/`), 3000);
            })
            .catch((error) => {
                alert("❌ Lỗi khi gửi email");
                console.error(error);
            });
        setIsLoading(false);
    };

    const [amount, setAmount] = useState(1);
    useEffect(() => {
        switch (voucher.voucher) {
            case 'earlyjoin10':
                setSale(((basePrice * amount) * 0.9));
                setDiscount(10);
                break;
            default:
                setSale(basePrice * amount);
                break;
        }

    }, [voucher, amount]);

    // Load countries
    useEffect(() => {
        const fetchCountries = async () => {
            setIsLoading(true);
            await fetch('https://countriesnow.space/api/v0.1/countries')
                .then(res => res.json())
                .then(data => setCountries(data.data))
                .catch();
            setIsLoading(false);
        };
        fetchCountries();
    }, []);

    // Load states when country changes
    useEffect(() => {
        if (!selCountry) return;
        const fetchStates = async () => {
            setIsLoading(true);
            await fetch('https://countriesnow.space/api/v0.1/countries/states', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ country: selCountry })
            })
                .then(res => res.json())
                .then(data => setStates(data.data.states || []))
                .catch();
            setSelState(''); setCities([]); setSelCity('');
            setIsLoading(false);
        };
        fetchStates();
    }, [selCountry]);

    // Load cities when state changes
    useEffect(() => {
        if (!selCountry || !selState) return;
        const fetchCities = async () => {
            setIsLoading(true);
            await fetch('https://countriesnow.space/api/v0.1/countries/state/cities', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ country: selCountry, state: selState })
            })
                .then(res => res.json())
                .then(data => setCities(data.data || []))
                .catch();
            setSelCity('');
            setIsLoading(false);
        };
        fetchCities();
    }, [selState, selCountry]);

    const formik = useFormik({
        validateOnChange: false,
        validateOnBlur: false,
        initialValues: {
            email: "",
            phone: "",
            country: "",
            state: "",
            city: "",
            street: "",
            firstName: "",
            lastName: "",
        },
        onSubmit: async (values, { setSubmitting }) => {

            // Open blank popup immediately to avoid blocker
            const popup = window.open(
                '',
                'CoinbaseCheckout',
                'toolbar=0,location=0,menubar=0,width=600,height=700'
            );

            try {
                const response = await axios.post(
                    'https://api.commerce.coinbase.com/charges',
                    {
                        name: 'DravoX Controller',
                        description: 'Purchase of DravoX Controller',
                        pricing_type: 'fixed_price',
                        local_price: { amount: sale.toString(), currency: 'USD' },
                        metadata: {
                            email: values.email,
                            firstName: values.firstName,
                            lastName: values.lastName,
                            address: `${values.street}, ${values.city}, ${values.state}, ${values.country}`,
                            phone: values.phone
                        }
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CC-Api-Key': process.env.REACT_APP_COINBASE_API_KEY,
                            'X-CC-Version': '2018-03-22'
                        }
                    }
                );
                const { hosted_url: hostedUrl, id: chargeId } = response.data.data;
                if (popup) popup.location.href = hostedUrl;

                // Bắt đầu polling trạng thái
                const interval = setInterval(async () => {
                    try {
                        const statusRes = await axios.get(
                            `https://api.commerce.coinbase.com/charges/${chargeId}`,
                            {
                                headers: {
                                    'X-CC-Api-Key': process.env.REACT_APP_COINBASE_API_KEY,
                                    'X-CC-Version': '2018-03-22'
                                }
                            }
                        );

                        const timeline = statusRes.data.data.timeline;
                        const currentStatus = timeline.length > 0 ? timeline.slice(-1)[0].status : 'UNKNOWN';
                        if (currentStatus === 'PENDING' || currentStatus === 'CONFIRMED') {
                            console.log(`Payment reached desired status: ${currentStatus}. Triggering handleSendEmail.`);
                            clearInterval(interval);
                            handleSendEmail();
                        } else if (currentStatus === 'CANCELED' || currentStatus === 'EXPIRED' || currentStatus === 'RESOLVED') {

                            clearInterval(interval);
                        }
                    } catch (e) {
                        console.error('Lỗi khi kiểm tra trạng thái charge:', e);
                        clearInterval(interval);
                    }
                }, 2000);
            } catch (error) {
                console.error('Error creating charge:', error);
                // Close popup if error
                if (popup) popup.close();
            }
            setSubmitting(false);
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Are you sure this is a REAL email address?').required("Hey! Where's the email?").max(255, "No no, there are no email longer than 255 characters"),
            phone: Yup.string().required("Please contains your phone!")
                .min(8, "Must be at least 8 and no more than 20 numbers")
                .max(20, "Must be at least 8 and no more than 20 numbers"),
            firstName: Yup.string().max(255, "255 characters only, please!").required("First name is required!"),
            lastName: Yup.string().max(255, "255 characters only, please!").required("Last name is required!"),
            country: Yup.string().required("Country is required!"),
            street: Yup.string().required("Street is required!").max(1024, "1024 characters only, please!"),
        }),
    });


    const onAmountChange = (event) => {
        const newValue = event.target.value;
        setAmount((parseInt(newValue) || 1) <= 100 ? (parseInt(newValue) || 1) : 100);
    };

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth={false}
                disableGutters
                sx={{ minHeight: '100vh', width: '100%' }}
            >
                <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 100 }} open={isLoading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                {/* Left: Form */}
                <Stack
                    direction={{ xs: 'column-reverse', md: 'row' }}
                    justifyContent="space-between"
                    sx={{ flex: 1, minHeight: '100vh' }}
                >
                    <Box
                        flex={1} p={4} sx={{ backgroundColor: 'white' }}
                    >
                        <form onSubmit={formik.handleSubmit}>
                            <Grid className="formregister" container spacing={2} direction="column">
                                <Grid item xs={12}>
                                    <Typography variant="h5" gutterBottom fullWidth sx={{ fontWeight: 700 }}>
                                        CHECKOUT FORM
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant='h6' gutterBottom fullWidth sx={{ fontWeight: 700 }}>
                                        Contract
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        name="email"
                                        autoComplete="email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.errors.email && (
                                        <Typography variant="body2" color="red">
                                            {formik.errors.email}
                                        </Typography>
                                    )}
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox defaultChecked />} label="Get notified about new products." />
                                    </FormGroup>
                                </Grid>
                                <Grid item xs={12} display={'flex'} gap={2}>

                                    <TextField
                                        fullWidth
                                        label="First Name"
                                        name="firstName"
                                        autoComplete="firstName"
                                        value={formik.values.firstName}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.errors.firstName && (
                                        <Typography variant="body2" color="red">
                                            {formik.errors.firstName}
                                        </Typography>
                                    )}
                                    <TextField
                                        fullWidth
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="lastName"
                                        value={formik.values.lastName}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.errors.lastName && (
                                        <Typography variant="body2" color="red">
                                            {formik.errors.lastName}
                                        </Typography>
                                    )}
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Phone Number"
                                        name="phone"
                                        autoComplete="phone"
                                        value={formik.values.phone}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.errors.phone && (
                                        <Typography variant="body2" color="red">
                                            {formik.errors.phone}
                                        </Typography>
                                    )}
                                </Grid>
                                <Typography variant='h6' gutterBottom fullWidth sx={{ fontWeight: 700 }}>
                                    Billing Address
                                </Typography>
                                <Grid item xs={12} display={'flex'} gap={2}>

                                    <FormControl fullWidth>
                                        <InputLabel>Country</InputLabel>
                                        <Select
                                            value={selCountry}
                                            label="Country"
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                setSelCountry(value);
                                                formik.setFieldValue('country', value);
                                            }}
                                            name="country"
                                            autoComplete="country"
                                        >
                                            {countries.map(c => (
                                                <MenuItem key={c.country} value={c.country}>
                                                    {c.country}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {formik.errors.country && (
                                            <Typography variant="body2" color="red">
                                                {formik.errors.country}
                                            </Typography>
                                        )}
                                    </FormControl>
                                    <FormControl fullWidth disabled={!states.length}>
                                        <InputLabel>State/Province</InputLabel>
                                        <Select
                                            value={selState}
                                            label="State/Province"
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                setSelState(value);
                                                formik.setFieldValue('state', value);
                                            }}
                                        >
                                            {states.map(s => (
                                                <MenuItem key={s.name} value={s.name}>
                                                    {s.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {formik.errors.state && (
                                            <Typography variant="body2" color="red">
                                                {formik.errors.state}
                                            </Typography>
                                        )}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth disabled={!cities.length}>
                                        <InputLabel>City</InputLabel>
                                        <Select
                                            value={selCity}
                                            label="City"
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                setSelCity(value);
                                                formik.setFieldValue('city', value);
                                            }}
                                        >
                                            {cities.map(city => (
                                                <MenuItem key={city} value={city}>
                                                    {city}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {formik.errors.city && (
                                            <Typography variant="body2" color="red">
                                                {formik.errors.city}
                                            </Typography>
                                        )}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Street address"
                                        name="street"
                                        autoComplete="street"
                                        value={formik.values.street}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.errors.street && (
                                        <Typography variant="body2" color="red">
                                            {formik.errors.street}
                                        </Typography>
                                    )}
                                </Grid>
                                <Button type="submit" variant="contained" fullWidth sx={{ fontWeight: 700, bgcolor: 'rgb(234, 151, 6)', '&:hover': { bgcolor: 'rgba(205, 132, 6, 1)' } }}>
                                    PAY NOW
                                </Button>
                            </Grid>
                        </form>
                    </Box>
                    {/* Right: Product */}
                    <Box
                        flex={1} p={4} sx={{ backgroundColor: 'rgb(36, 36, 36)' }}

                    >
                        <Typography variant="h5" gutterBottom color='white'>Preview product & price</Typography>
                        <Card
                            sx={{
                                mt: 2,
                                bgcolor: 'rgb(36, 36, 36)',
                                boxShadow: '0 0 10px rgba(0, 0, 0, 1)',
                                border: '1px solid rgba(0, 0, 0, 0.3)',
                                borderRadius: '24px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: 5,
                                p: 3,
                            }}
                        >
                            <CardMedia
                                component="img"
                                image="/images/product4.png"
                                alt="DravoX Controller"
                                sx={{
                                    width: '100%',
                                    maxWidth: 500,
                                    height: 'auto',
                                    objectFit: 'contain',
                                }}
                            />

                            <CardContent sx={{ width: '100%' }}>
                                <Box
                                    display="flex"
                                    flexDirection={{ xs: 'column', sm: 'row' }}
                                    gap={4}
                                >
                                    <Box flex={1}>
                                        <Typography variant="h5" color="rgb(255, 167, 15)">
                                            DravoX Controller
                                        </Typography>
                                        <Typography variant="body1" sx={{ mt: 2 }} color="white">
                                            Dravox Controller brings seamless control and precision, built
                                            to elevate your gaming with comfort and power.
                                        </Typography>
                                    </Box>

                                    <Box flex={1}>
                                        <Typography variant="h6" color="rgb(231, 255, 15)">
                                            Billing's details
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color={discount !== 0 ? 'rgb(0, 212, 215)' : 'white'}
                                        >
                                            {discount === 0
                                                ? 'No voucher found!'
                                                : `${discount}% discount, save ${(
                                                    basePrice * amount -
                                                    sale
                                                ).toFixed(2)} USD!`}
                                        </Typography>

                                        <TextField
                                            label="Quantity"
                                            type="number"
                                            fullWidth
                                            value={amount}
                                            onChange={onAmountChange}
                                            size="small"
                                            InputProps={{
                                                inputProps: {
                                                    max: 10000,
                                                },
                                            }}
                                            sx={{
                                                mt: 1,
                                                mb: 2,
                                                maxWidth: 120,
                                                '& .MuiInputLabel-root': {
                                                    color: 'rgba(0, 255, 251, 0.7)',
                                                    '&.Mui-focused': {
                                                        color: 'rgba(0, 255, 251, 0.7)',
                                                    },
                                                },
                                                '& .MuiInputBase-input': {
                                                    color: 'white',
                                                    '&::placeholder': {
                                                        color: 'rgba(255, 255, 255, 0.7)',
                                                        opacity: 1,
                                                    },
                                                },
                                                '& .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: 'white !important',
                                                },
                                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: 'white !important',
                                                },
                                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: 'white !important',
                                                },
                                            }}
                                        />

                                        <Typography variant="h6" color="white">
                                            Total: {sale.toFixed(2)} USD
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>

                    </Box>
                </Stack>
                <Dialog open={showSuccess} aria-labelledby="success-dialog" className="dialog-custom">
                    <div className="success-dialog status-dialog">
                        <h2>Payment Successful!</h2>
                        <p>You will be redirected to main page...</p>
                    </div>
                </Dialog>
            </Container>
        </ThemeProvider>
    );
}