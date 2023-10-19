import { RepContact } from "./RepContact";

export function GetContacts({contactsArr,updateCount, bold_index,updateChat}){
    const sortedContacts =  contactsArr.sort((a, b) => {
        if (!a.lastMessage && !b.lastMessage) {
          return 0; // No change in order if both have null lastMessage
        } else if (!a.lastMessage) {
          return 1; // a has null lastMessage, so it comes after b
        } else if (!b.lastMessage) {
          return -1; // b has null lastMessage, so it comes after a
        } else {
          return new Date(b.lastMessage.created) - new Date(a.lastMessage.created);
        }
      });

    const contactTab = sortedContacts.map((Contact, index) => {
        if(Contact.id===bold_index){
            return (
                <RepContact
                    key={index}
                    contact={Contact}
                    updateCount={updateCount}
                    updateChat={updateChat}
                    color="lightBlue"
                />
            );}
        return (
            <RepContact
                key={index}
                contact={Contact}
                updateCount={updateCount}
                updateChat={updateChat}
                color="white"
            />
        );
    });
    return (
        <div className="card">
            <div className="card-body overflow-auto " id="contacts" >
                <ul className="list-unstyled mb-0">
                    {contactTab}
                </ul>
            </div>
        </div>
    );
}

