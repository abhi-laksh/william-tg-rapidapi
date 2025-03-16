import { Container } from '@mantine/core';
import { SearchInterface } from '@/components/Search/SearchInterface';

export default function Home() {
  return (
    <Container size="xl" py="xl">
      <SearchInterface />
    </Container>
  );
}
