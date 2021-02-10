import { Button, FormGroup, TextField } from "@material-ui/core";
import { Formik, Field, Form, useField } from "formik";
import React from "react";
import { connect } from "react-redux";
import * as Yup from "yup";
import { setFormInfo, setHiddenForm } from "../../store";

import "./Form.scss";

const mapStateToProps = (state) => {
  return {
    form: state.form,
  };
};

export const SubmiteForm = connect(mapStateToProps, {
  setFormInfo,
  setHiddenForm,
})(({ goodsInCart, setFormInfo, setHiddenForm }) => {
  const hiddenForm = (e) => {
    if (
      e.target.className.includes("form-background") ||
      e.currentTarget.className.includes("close-form")
    )
      setHiddenForm();
  };

  return (
    <div>
      <div className='form-background' onClick={hiddenForm}></div>

      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          age: "",
          address: "",
          tel: "",
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          lastName: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          age: Yup.number().required("Required").min(1),
          address: Yup.string().required("Required"),
          tel: Yup.string().required("Required").max(17, "Too long phone"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);

          setFormInfo(values);

          console.log('Information:', values);
          console.log('Your Product:', goodsInCart);

          Object.keys(localStorage).map(
            (key) => key.includes("toCart") && localStorage.removeItem(key),
          );

          setHiddenForm();
        }}>
        <Form className='form'>
          <h2 className='form-title'>Your Form</h2>
          <FormGroup>
            <MyField name='firstName' as={TextField} label='First Name' />
          </FormGroup>
          <FormGroup>
            <MyField name='lastName' as={TextField} label='Last Name' />
          </FormGroup>
          <FormGroup>
            <MyField name='age' type='number' as={TextField} label='Your Age' />
          </FormGroup>
          <FormGroup>
            <MyField name='email' type='text' as={TextField} label='Email' />
          </FormGroup>
          <FormGroup>
            <MyField
              name='address'
              type='text'
              as={TextField}
              label='Your Address'
            />
          </FormGroup>
          <FormGroup>
            <MyField
              name='tel'
              type='tel'
              as={TextField}
              label='Phone'
              placeholder='+38(xxx)xx-xx-xxx'
              helperText='Example: +38(xxx)xx-xx-xxx'
            />
          </FormGroup>
          <FormGroup>
            <Button color='primary' type='submite'>
              Chekout
            </Button>
            <Button
              color='secondary'
              type='reset'
              onClick={() => console.log(goodsInCart)}>
              Reset
            </Button>
            <Button
              className='close-form'
              color='secondary'
              type='reset'
              onClick={(e) => hiddenForm(e)}>
              Close
            </Button>
          </FormGroup>
        </Form>
      </Formik>
    </div>
  );
});

const MyField = ({ label, ...props }) => {
  const [field, { error, touched }] = useField(props);
  return error && touched ? (
    <Field
      error
      {...field}
      {...props}
      as={TextField}
      label={error}
      placeholder={label}
    />
  ) : (
    <Field {...field} {...props} as={TextField} label={label} />
  );
};
