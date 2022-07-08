import { ExpirationCompleteEvent, Publisher, Subjects } from "@black_sheep/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent>{
    readonly subject = Subjects.ExpirationComplete;
}