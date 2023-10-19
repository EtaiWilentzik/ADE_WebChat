export class Message {
    constructor(content, time, type) {
        this.content = content;
        this.time = time;
        this.type = type;
    }
}

export class Contact {
    constructor(name, image, status) {
        this.name = name;
        this.image = image;
        this.status=status;
        this.messages = [];
         const currentTime = new Date();
          const hour = currentTime.getHours().toString().padStart(2, '0');
          const minutes = currentTime.getMinutes().toString().padStart(2, '0');
          const seconds = currentTime.getSeconds().toString().padStart(2, '0');
          const timestamp = `${hour}:${minutes}:${seconds}`;
          this.displayTime = timestamp;
       
     

    }


    addMessage(content, type) {
       const currentTime = new Date();
        const hour = currentTime.getHours().toString().padStart(2, '0');
        const minutes = currentTime.getMinutes().toString().padStart(2, '0');
        const seconds = currentTime.getSeconds().toString().padStart(2, '0');
        const timestamp = `${hour}:${minutes}:${seconds}`;
        this.displayTime = timestamp;
      const message = new Message(content, timestamp, type);
      this.messages.push(message);

    }
}

