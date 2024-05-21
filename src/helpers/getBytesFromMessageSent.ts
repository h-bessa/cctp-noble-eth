
interface IAttribute {
    key: string;
    value: string;
}
interface IEvent {
    type: string;
    attributes: IAttribute[];
}
const getBytesFromMessageSent = (events: IEvent[], topic: string): Uint8Array => {
    const messageSentEvent = events.find((e:IEvent) => e.type === topic);
    const rawValue = messageSentEvent?.attributes[0].value || '';
    const encoder = new TextEncoder();
    const encodedValue = encoder.encode(rawValue);
    return new Uint8Array(encodedValue.buffer);
};

export default getBytesFromMessageSent;