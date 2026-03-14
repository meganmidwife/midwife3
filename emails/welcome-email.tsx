import { Body, Button, Container, Head, Heading, Html, pixelBasedPreset, Preview, Tailwind, Text } from "@react-email/components";

type Props = {
    name: string;
    email: string;
    text: string;
}
export default function WelcomeEmail({name, email, text}: Props) {
  return (
    <Html>
      
      <Tailwind config={{presets: [pixelBasedPreset]}}>
        <Head />
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
            <Container className="mx-auto my-10 max-w-116.25 rounded border border-[#eaeaea] border-solid p-5">
            <Preview>Welcome email</Preview>
            <Heading className="text-2xl font-bold text-gray-900">
                Welcome to our service, {name}!
            </Heading>
            <Text className=" text-gray-700">
                {text} 
            </Text>
            <Text>
                Senders Email: {email}
            </Text>
            <Button className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600" href="https://react.email">
                Learn more
            </Button>

            </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
