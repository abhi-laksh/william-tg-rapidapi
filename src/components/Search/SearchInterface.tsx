'use client';

import { TextInput, Group, Paper, Title, Stack, Tabs, Code, Loader, Text, Table, Avatar, Anchor } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { useState, useEffect, ChangeEvent } from 'react';
import { useLinkedInSearch } from '@/hooks/useLinkedInSearch';
import type { CompanySearchResponse, ProfileSearchResponse } from '@/types/linkedin';

export function SearchInterface() {
  const [searchType, setSearchType] = useState<'profile' | 'company'>('profile');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery] = useDebouncedValue(searchQuery, 300);
  const [mounted, setMounted] = useState(false);

  // Prevent hydration errors by only rendering after component is mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  const { data, isLoading, error } = useLinkedInSearch({
    type: searchType,
    keyword: debouncedQuery,
    page: 1,
  });

  const handleTabChange = (value: string | null) => {
    if (value === 'profile' || value === 'company') {
      setSearchType(value);
    }
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.currentTarget.value);
  };

  const renderProfileResults = () => {
    const profileData = data as ProfileSearchResponse;
    
    if (!profileData?.data?.people || profileData.data.people.length === 0) {
      return <Text>No profiles found</Text>;
    }

    return (
      <Stack>
        <Text size="sm">Found {profileData.data.totalResults} profiles</Text>
        <Table striped highlightOnHover withTableBorder>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Profile</Table.Th>
              <Table.Th>Title</Table.Th>
              <Table.Th>Location</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {profileData.data.people.map((profile, index) => (
              <Table.Tr key={index}>
                <Table.Td>
                  <Group>
                    <Avatar src={profile.profilePicture} radius="xl" size="md" />
                    <Anchor href={profile.navigationUrl} target="_blank">
                      {profile.fullName}
                    </Anchor>
                  </Group>
                </Table.Td>
                <Table.Td>{profile.primarySubtitle}</Table.Td>
                <Table.Td>{profile.secondarySubtitle}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Stack>
    );
  };

  const renderCompanyResults = () => {
    const companyData = data as CompanySearchResponse;
    
    if (!companyData?.data || companyData.data.length === 0) {
      return <Text>No companies found</Text>;
    }

    return (
      <Stack>
        <Text size="sm">Found {companyData.data.length} companies</Text>
        <Table striped highlightOnHover withTableBorder>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Company</Table.Th>
              <Table.Th>Details</Table.Th>
              <Table.Th>Followers</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {companyData.data.map((company, index) => (
              <Table.Tr key={index}>
                <Table.Td>
                  <Group>
                    <Avatar src={company.companyLogo} radius="sm" size="md" />
                    <Anchor href={company.navigationUrl} target="_blank">
                      {company.companyName}
                    </Anchor>
                  </Group>
                </Table.Td>
                <Table.Td>{company.primarySubtitle}</Table.Td>
                <Table.Td>{company.secondarySubtitle}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Stack>
    );
  };

  const renderResults = () => {
    if (!data) return null;

    try {
      if (searchType === 'profile') {
        return renderProfileResults();
      } else {
        return renderCompanyResults();
      }
    } catch (err) {
      console.error('Error rendering results:', err);
      return (
        <Code block>
          {JSON.stringify(data, null, 4)}
        </Code>
      );
    }
  };

  // Don't render anything until component is mounted to prevent hydration errors
  if (!mounted) {
    return <Loader />;
  }

  return (
    <Paper shadow="sm" p="xl" radius="md">
      <Stack gap="md">
        <Title order={2}>LinkedIn Search by Abhishek Soni</Title>
        
        <Tabs value={searchType} onChange={handleTabChange}>
          <Tabs.List>
            <Tabs.Tab value="profile">Profiles</Tabs.Tab>
            <Tabs.Tab value="company">Companies</Tabs.Tab>
          </Tabs.List>
        </Tabs>

        <TextInput
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          size="lg"
        />

        {isLoading && <Loader />}
        {error && <Text color="red">Error: {(error as Error).message}</Text>}
        {data && renderResults()}
      </Stack>
    </Paper>
  );
}
