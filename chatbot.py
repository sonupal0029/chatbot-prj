
import random
import re

# Store chatbot responses in one place.
responses = [
    (
        r"\b(hi|hello|hey|hola)\b",
        [
            "Hello! How can I help you?",
            "Hey there! Nice to meet you.",
            "Hi! What would you like to talk about?"
        ]
    ),
    (
        r"\bmy name is ([a-zA-Z ]+)",
        [
            "Nice to meet you, {name}!",
            "Hello {name}! How are you today?"
        ]
    ),
    (
        r"\b(what is your name|what's your name|who are you)\b",
        [
            "I'm CleverBot, a chatbot built with Python and NLTK.",
            "My name is CleverBot. Nice to meet you!"
        ]
    ),
    (
        r"\bhow are you\b",
        [
            "I'm doing well! Thanks for asking.",
            "I'm great and ready to chat with you."
        ]
    ),
    (
        r"\b(help|help me|can you help)\b",
        [
            "Of course! Tell me what you need help with.",
            "I'm here to help. What would you like to know?"
        ]
    ),
    (
        r"\b(who created you|who made you|who developed you)\b",
        [
            "I was created by Prakash using Python's NLTK library."
        ]
    ),
    (
        r"\b(where are you|what is your location|which city)\b",
        [
            "My developer configured my location response as Hyderabad, India."
        ]
    ),
    (
        r"\b(sports|sport|cricket)\b",
        [
            "Cricket is a popular sport! Who is your favorite cricketer?"
        ]
    ),
    (
        r"\b(sorry|i apologize|i am sorry)\b",
        [
            "That's alright!",
            "No worries. Let's continue."
        ]
    ),
    (
        r"\b(bye|goodbye|see you|quit|exit)\b",
        [
            "Goodbye! It was nice talking to you.",
            "See you soon! Have a great day."
        ]
    ),
]


def get_response(message):
    message = message.strip()

    if not message:
        return "Please enter a message."

    # Normalize repeated whitespace.
    message = re.sub(r"\s+", " ", message)

    for pattern, possible_responses in responses:
        match = re.search(pattern, message, re.IGNORECASE)

        if match:
            # Personalize the response if a name was provided.
            if pattern == responses[1][0]:
                name = match.group(1).strip().title()
                response = random.choice(possible_responses)
                return response.format(name=name)

            return random.choice(possible_responses)

    # Fallback when no rule matches.
    return (
        "I'm not sure how to answer that yet. "
        "Try asking about my name, creator, or how I can help."
    )
