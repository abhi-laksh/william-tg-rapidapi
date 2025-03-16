export interface ProfileResponse {
  success: boolean;
  status: number;
  data: {
    people: Array<{
      fullName: string;
      primarySubtitle: string;
      profilePicture: string;
      secondarySubtitle: string;
      navigationUrl: string;
    }>;
    totalResults: number;
  };
}

export interface CompanyResponse {
  success: boolean;
  status: number;
  data: Array<{
    companyName: string;
    primarySubtitle: string;
    summary: string;
    companyUrn: string;
    companyId: string;
    companyLogo: string;
    secondarySubtitle: string;
    navigationUrl: string;
  }>;
}

export type ProfileSearchResponse = ProfileResponse;
export type CompanySearchResponse = CompanyResponse;
