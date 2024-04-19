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
export const dynamic = "force-dynamic";

export default async function Home() {
  const response = await getCardCollections();
  if (!response) {
    return <div>Loading...</div>;
  }

  const attributes = response.data.attributes;
  const { sectionTitle, sectionDescription } = attributes;

  const cards = attributes.cards;
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
const fullURL =
  "https://genuine-strength-1abe72c651.strapiapp.com/api/card-collections/1/?populate[0]=cards&populate[1]=cards.link";
async function getCardCollections(): Promise<StrapiResponse | undefined> {
  try {
    // const response = await
    // fetch(`${BASE_URL}card-collections/1/?populate=*`);
    const response = await fetch(fullURL);
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
  console.log("🚀  cards:", cards[0].link);
  return (
    <div className='grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4'>
      {cards?.map((card) => (
        <Card key={card.id} className='flex flex-col'>
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
            <div className='flex flex-col gap-5 mt-6'>
              {card.link?.map((link) => (
                <a
                  key={link.id}
                  href={link.linkUrl}
                  className='text-sm text-purple-600 underline'>
                  {link.linkText}
                </a>
              ))}
            </div>
          </CardContent>
          <CardFooter className='mt-auto'>
            {new Date(card.date).toLocaleDateString()}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
const randomNumberLessThan = (max: number) => Math.floor(Math.random() * max);
