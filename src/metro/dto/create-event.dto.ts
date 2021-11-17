export class CreateEventDto {
    title: string;
    description: string;
    startDatetime: string;
    endDatetime: string;
    status: string;
    upvotes: number;
    createdByUserId: number;
}