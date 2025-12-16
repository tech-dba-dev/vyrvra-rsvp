export type ViewState = 'LANDING' | 'RSVP' | 'CONFIRMATION';

export interface RSVPFormData {
    fullName: string;
    email: string;
    guests: string;
}

export interface GuestOption {
    value: string;
    label: string;
}

export const GUEST_OPTIONS: GuestOption[] = [
    { value: '1', label: 'Admit One' },
    { value: '2', label: 'Admit Two' },
    { value: '3', label: 'Admit Three' }
];