import React, { useState, useEffect } from 'react';
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button,
  CssBaseline,
} from '@material-ui/core';
import {
  Link,
  // useHistory
} from 'react-router-dom';
import { commerce } from '../../../lib/commers';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import useStyles from './checkoutStyles';

const steps = ['Shipping address', 'Payment details'];

const Checkout = ({ cart, order, error, onCaptureCheckout, refreshCart }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});
  const [isFinished, setIsFinished] = useState(false);

  // const history = useHistory();

  const classes = useStyles();

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: 'cart',
        });

        setCheckoutToken(token);
      } catch (error) {
        console.log(error);
        // history.push('/')
      }
    };

    generateToken();
  }, [cart]);

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const next = (data) => {
    setShippingData(data);

    nextStep();
  };

  const timeout = () => {
    setTimeout(() => {
      setIsFinished(true);
    }, 3000);
  };

  let Confirmation = () =>
    order.customer ? (
      <>
        <div>
          <Typography variant='h5'>
            Thank you for your purchase,{' '}
            {`${order.customer.firstname} ${order.customer.lastname}`}
          </Typography>
          <Divider className={classes.divider} />
          <Typography variant='subtitle2'>
            Order ref {order.payment.stripe.payment_method_id}
          </Typography>
        </div>
        <br />
        <Button component={Link} to='/' variant='outlined' type='button'>
          Back to Home
        </Button>
      </>
    ) : isFinished ? (
      <>
        <div>
          <Typography variant='h5'>
            Thank you for your purchase,{' '}
            {`${shippingData.firstName} ${shippingData.lastName}`}
          </Typography>
          <Divider className={classes.divider} />
          <Typography variant='subtitle2'>
            *This is condition for mockup only, that means I do not provide my
            credit card on Commerce Js / I do not have one
          </Typography>
          <Typography variant='subtitle2'>
            *If you want to use it, feel free by doing a pull request on the
            Github repository
          </Typography>
          <Typography variant='subtitle2'>
            *Everything is run properly, only "Credit Card" on the Commerce Js
            Payment Gateway
          </Typography>
        </div>
        <br />
        <Button component={Link} to='/' variant='outlined' type='button'>
          Back to Home
        </Button>
      </>
    ) : (
      <div className={classes.spinner}>
        <CircularProgress />
      </div>
    );

  if (error) {
    <>
      <Typography variant='h5'>Error : {error}</Typography>
      <br />
      <Button component={Link} to='/' variant='outlined' type='button'>
        Back to Home
      </Button>
    </>;
  }

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} next={next} />
    ) : (
      <PaymentForm
        shippingData={shippingData}
        checkoutToken={checkoutToken}
        backStep={backStep}
        onCaptureCheckout={onCaptureCheckout}
        nextStep={nextStep}
        refreshCart={refreshCart}
        timeout={timeout}
      />
    );

  return (
    <>
      <CssBaseline />
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant='h4' align='center'>
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Confirmation />
          ) : (
            checkoutToken && <Form />
          )}
        </Paper>
      </main>
    </>
  );
};

export default Checkout;
