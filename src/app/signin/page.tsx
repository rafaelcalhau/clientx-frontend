"use client"

import { useState } from "react"
import Alert from "@mui/joy/Alert"
import IconButton from "@mui/joy/IconButton"
import Button from "@mui/joy/Button"
import FormControl from "@mui/joy/FormControl"
import FormLabel from "@mui/joy/FormLabel"
import Input from "@mui/joy/Input"
import CloseIcon from '@mui/icons-material/Close'
import WarningIcon from '@mui/icons-material/Warning'
import Image from "next/image"
import { useRouter } from 'next/navigation'
import { useForm, SubmitHandler } from "react-hook-form"
import { FormErrorText } from "@/components/FormErrorText"
import { PublicPageContainer } from "@/components/PublicPageContainer"

import type { SignInInputs } from "./signin.interfaces"

const SignInPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm<SignInInputs>()

  const router = useRouter()
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false)
  const [authenticationError, setAuthenticationError] = useState<string>("")

  const onSubmit: SubmitHandler<SignInInputs> = data => {
    setIsAuthenticating(true)
    setAuthenticationError('')

    fetch('/api/signin', { method: 'POST', body: JSON.stringify(data) })
      .then(result => result.json())
      .then(data => {
        if (data?.message) {
          setAuthenticationError(data.message)
          resetField('password')
        } else {
          router.push('/')
        }
      })
      .finally(() => setIsAuthenticating(false))
  }

  return (
    <PublicPageContainer title="Sign In">
      <div className="flex flex-col items-center justify-center w-72">
        <Image alt="Logo" src="/logo-clientx.png" width={200} height={128} priority />
        <div className="flex flex-col mt-6 mb-6">
          <h2 className="h1">Sign in to your account</h2>
          <p>Welcome back</p>
        </div>
        {authenticationError.length > 0 && (
          <div className="mb-6">
            <Alert
              startDecorator={<WarningIcon />}
              variant="soft"
              color="danger"
              endDecorator={
                <IconButton variant="soft" size="sm" color="danger" onClick={() => setAuthenticationError('')}>
                  <CloseIcon />
                </IconButton>
              }
            >
              {authenticationError}
            </Alert>
          </div>
        )}
        <form className="flex flex-col w-full mb-6 gap-3" onSubmit={handleSubmit(onSubmit)}>
          <FormControl required>
            <FormLabel>Email</FormLabel>
            <Input disabled={isAuthenticating} type="email" {...register("username", { required: true })} />
            {errors.username && <FormErrorText>This field is required</FormErrorText>}
          </FormControl>
          <FormControl required>
            <FormLabel>Password</FormLabel>
            <Input disabled={isAuthenticating} type="password" {...register("password", { required: true })} />
            {errors.password && <FormErrorText>This field is required</FormErrorText>}
          </FormControl>
          <Button loading={isAuthenticating} variant="solid" type="submit" fullWidth>
            Sign in
          </Button>
        </form>
      </div>
      <div className="text-sm">
        &copy; <a href="https://github.com/rafaelcalhau" target="_blank">github.com/rafaelcalhau</a>
      </div>
    </PublicPageContainer>
  )
}

export default SignInPage
