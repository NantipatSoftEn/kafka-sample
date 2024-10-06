// kafkaClient.js
import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9094'] // แก้ไขเป็นที่อยู่ broker ของคุณ
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'test-group' });

export const run = async () => {
  // รัน Producer
  await producer.connect();
  console.log('Producer connected');

  // รัน Consumer
  await consumer.connect();
  console.log('Consumer connected');

  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });

  // เริ่มฟังข้อความ
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`Received message: ${message.value.toString()}`);
    },
  });
};



export const startKafka = async () => {
  try {
    await run();
  } catch (error) {
    console.log('Error: ', error);
  }
}

export const stopKafka = async () => {
  await producer.disconnect();
  await consumer.disconnect();
  console.log('Producer and Consumer disconnected');
};

// run().catch(console.error);

// ส่งข้อความ
export const sendMessage = async (message: string) => {
  await producer.send({
    topic: 'test-topic',
    messages: [{ value: message }],
  });
  console.log(`Message sent: ${message}`);
};

