'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import Link  from "next/link"
import { useState , useEffect, use  } from "react"
import { useDebounceValue , useDebounceCallback  } from "usehooks-ts"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { signUpSchema } from "@/schemas/signUpSchema"
import axios, { AxiosError } from "axios"
import { ApiResponse } from "@/types/ApiResponse"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
// If your Input component is located elsewhere, update the path accordingly.

export default function Component() {
  
  const [ username, setUsername ] = useState("")
  const [userMessage, setUserMessage] = useState("")
  const [isCheckingUsername, setIsCheckingUsername] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const debounceUsername  = useDebounceCallback(setUsername, 300)
  const router = useRouter()

  // zod implementation with useform in ueform we have get register or it also knows as the form 


  const  form = useForm({
    resolver: zodResolver(signUpSchema), 
    defaultValues: {
      email: '',
      username: '',
      password: ''
    }
  })

  useEffect(() => {
    if (!username || username.length < 3) {
      setUserMessage("")
      return
    }

    let isCancelled = false

    const checkUsername = async () => {
      setIsCheckingUsername(true)
      try {
        const res = await axios.get(`/api/check-username`, {
          params: { username: username }
        })
        const data = res.data
        if (!isCancelled) {
          if (data.success == true) {
            setUserMessage(data.message)
          } else {
            setUserMessage("Username is taken")
          }
        }
      } catch (error) {
        const AxiosError = error as AxiosError<ApiResponse>;
        if (!isCancelled) {
          setUserMessage(AxiosError.response?.data.message || "Error checking username")
        }
      } finally {
        if (!isCancelled) {
          setIsCheckingUsername(false)
        }
      }
    }

    checkUsername() 

    return () => {
      isCancelled = true
    }
  }, [username])


  // form sumbiting fucntion who handle the data 

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true)
    try {
      const res = await axios.post('/api/sign-up', data)
      const resData = res.data as ApiResponse 
      if (resData.success) {
        toast.success(resData.message)
        router.replace(`/verify/${username}`)
        setIsSubmitting(false)
      } else {
        toast.error(resData.message)
      }
      
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(axiosError.response?.data.message || "An error occurred during sign up.")
      setIsSubmitting(false)
    }}

    return (
    <>
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg  p-8 bg-white rounded drop-shadow-lg">
        {/* Signup form will go here */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold"> Join Anonmous Message </h1>
          <p className="text-gray-600 mt-5 mb-3 font-bold"> Create your account </p>
        <div>

      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-lg mx-auto">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <>
                  <Input placeholder="Enter username" {...field}
                    onChange={(e) => {
                      field.onChange(e)
                      debounceUsername(e.target.value)
                    }}
                  />
                  {isCheckingUsername && <Loader2 className="absolute right-3 top-3 h-4 w-4 animate-spin" />}
                </>
                
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter email" {...field}
                // onChange={(e) => {
                  //   field.onChange(e)
                  //   setUsername(e.target.value)
                  // }}
                  // no need to manualy on change because we are not doing extra things from this field in username we are calling the api that why . in nomral it automatically take field input and pass to a form . 
                  />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter password" {...field} />
               
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
          />
        <Button type="submit" className="w-full">{isSubmitting ? ( 
          <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting 
          </>
         ) : ("Sign Up")}</Button>
      </form>
    </Form>
    <div className="text-center mt-4">
      <p>
        Already a member?{' '}
        <Link href="/sign-in" className="text-blue-500 hover:text-blue-700">
          Sign In
        </Link> 
      </p>

    </div>


            
            
          </div>

        </div>
      </div>
    </div>
    </>
    )
    

  
}