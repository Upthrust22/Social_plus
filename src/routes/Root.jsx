import {Outlet, useLoaderData, Link, Form} from "react-router-dom"
import {getContacts, createContact} from "../contact";

export async function action() {
    const contact = await getContacts();
    return { contact };

}
export async function loader() {
    const contacts = await getContacts();
    return { contacts };
}

export default function Root() {
    const {contacts} = useLoaderData();

    return (
        <>
            <div id="sidebar">
                <div>
                    <form id="search-form" role="search">
                        <input 
                            type="search"
                            id="q"
                            aria-label="Search contacts"
                            placeholder="Search"
                            name="q" 
                        />
                        <div 
                            className="sr-only"
                            aria-hidden
                            hidden={true}></div>
                        <div 
                            className="sr-only"
                            aria-live="polite"></div>
                    </form>
                    <Form method="post">
                        <button type="submit">New</button>
                    </Form>
                </div>
                <nav>
                    {contacts.length ? 
                       ( 
                    <ul>
                        {contacts.map(contact => (
                            <li key={contact.id}>
                                <Link>{contact.first || contact.last ? (
                                    <>{contact.first} {contact.last}</>
                                ) : (<i>No Name</i>)}{" "}
                                {contact.favorite && <span>*</span>}
                                </Link>
                            </li>
                        ))}
                    </ul>) : (
                    <p><i>No Contacts yet</i></p>
                    )}
                </nav>
            </div>
            <div id="detail">
                <Outlet />
            </div>
        </>
    )
} 