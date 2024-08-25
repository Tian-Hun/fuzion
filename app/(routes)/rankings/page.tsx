import { Card, Heading } from '@radix-ui/themes';
import { NextPage } from 'next';

interface RankingsPageProps {}

const RankingsPage: NextPage<RankingsPageProps> = ({}) => {
    return (
        <section className="container w-full flex flex-col gap-20px c-white px-50px pb-100px">
            <Heading size="7">Lucky Bag</Heading>
            <Card
                variant="surface"
                className="flex flex-col items-center justify-center gap-30px py-150px mb-20px"
            >
                <Heading size="3" mb="2">
                    Rankings coming soon!
                </Heading>
            </Card>
        </section>
    );
};

export default RankingsPage;
