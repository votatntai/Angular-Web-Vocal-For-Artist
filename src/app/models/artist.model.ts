export interface Artist {
    id: string,
    username: string,
    firstName: string,
    avatar: string,
    lastName: string,
    email: string,
    phone: string,
    bio: string,
    gender: string,
    studio: boolean,
    price: number,
    rate: number,
    status: string,
    bankName: string,
    bankAccountNumber: string,
    bankAccountOwner: string,
    bankBranch: string,
    countries: string[],
    voiceStyles: string[],
    voiceDemos: string[],
}

export interface YearSalary {
    date: number,
    monthlyRevenues: MonthSalary[],
    total: number
}

export interface MonthSalary {
    date: string,
    detailRevenues: Revenues[],
    total: number
}

export interface Revenues {
    amount: number,
    dateTime: Date,
    description: string
}
