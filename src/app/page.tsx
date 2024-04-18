import { StrapiResponse, Card as CardType } from "./types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Eye } from "lucide-react";

export default async function Home() {
  const response = await getCardCollections();
  if (!response) {
    return <div>Loading...</div>;
  }

  const attributes = response.data.attributes;
  const { sectionTitle, sectionDescription } = attributes;

  const cards = attributes.Card;
  return (
    <main className=' p-24'>
      <Card className='flex flex-col p-8'>
        <div className='flex space-x-6 pb-4'>
          <h1 className='text-lg font-bold'>{sectionTitle}</h1>
          <p className='text-base'>{sectionDescription}</p>
        </div>
        <div>
          <CardRepeater cards={cards} />
        </div>
      </Card>
    </main>
  );
}

const BASE_URL = "https://genuine-strength-1abe72c651.strapiapp.com/api/";
async function getRestaurants(): Promise<StrapiResponse | undefined> {
  try {
    const response = await fetch(`${BASE_URL}restaurants`);
    const data = await response.json();
    if (response.status !== 200) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    console.log(error);
  }
}
async function getCardCollections(): Promise<StrapiResponse | undefined> {
  try {
    const response = await fetch(`${BASE_URL}card-collections/1/?populate=*`);
    const data = await response.json();
    if (response.status !== 200) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    console.log(error);
  }
}

function CardRepeater({ cards }: { cards: CardType[] }) {
  return (
    <div className='grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4'>
      {cards?.map((card) => (
        <Card key={card.id}>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2 gap-3'>
            <CardTitle className='text-sm font-medium'>{card.title}</CardTitle>
            <div className='flex gap-2'>
              <Eye className='h-8 w-8 text-muted-foreground' />
              <p className='text-muted-foreground'>
                {randomNumberLessThan(10)}.{randomNumberLessThan(10)}k
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>{card.description}</CardDescription>
          </CardContent>
          <CardFooter>{new Date(card.date).toLocaleDateString()}</CardFooter>
        </Card>
      ))}
    </div>
  );
}
const randomNumberLessThan = (max: number) => Math.floor(Math.random() * max);
