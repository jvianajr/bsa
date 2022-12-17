import Head from 'next/head'
import Link from 'next/link'
import { Container } from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik';

function FormikExample() {
  function validateName(value) {
    let error
    if (!value) {
      error = 'Name is required'
    } else if (value.toLowerCase() !== 'naruto') {
      error = "Jeez! You're not a fan 😱"
    }
    return error
  }
}


export default function Mediacao() {
  return (
    <>
      <Head>
        <title>Coleções do Banco Sonoro Amazônico</title>
        <meta name="keywords" content="inserir palavras chave"></meta>
        <meta name="description" content="inserir descrição da página"></meta>
      </Head>
      <Container>

        <Formik
          initialValues={{ name: 'Sasuke' }}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2))
              actions.setSubmitting(false)
            }, 1000)
          }}
        >
          {(props) => (
            <Form>
              <Field name='name' validate={validateName}>
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.name && form.touched.name}>
                    <FormLabel>First name</FormLabel>
                    <Input {...field} placeholder='name' />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button
                mt={4}
                colorScheme='teal'
                isLoading={props.isSubmitting}
                type='submit'
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
        )

      </Container>
    </>
  )
}