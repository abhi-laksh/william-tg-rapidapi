'use client';

import { useQuery } from '@tanstack/react-query';
import { searchCompanies, searchProfiles } from '@/services/linkedin';
import type { CompanySearchResponse, ProfileSearchResponse } from '@/types/linkedin';

interface UseLinkedInSearchProps {
  type: 'company' | 'profile';
  keyword: string;
  page?: number;
}

type SearchResponse = CompanySearchResponse | ProfileSearchResponse;

export function useLinkedInSearch({ type, keyword, page = 1 }: UseLinkedInSearchProps) {
  return useQuery<SearchResponse>({
    queryKey: ['linkedin-search', type, keyword, page],
    queryFn: () => {
      if (type === 'company') {
        return searchCompanies({ keyword, page });
      }
      return searchProfiles({ keyword, page });
    },
    enabled: !!keyword,
  });
}
