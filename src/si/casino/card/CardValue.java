package si.casino.card;

public class CardValue {

    public static int getValue(Card card) {

        switch (card.getValue()) {
            case ACE: return 11;
            case TWO: return 2;
            case THREE: return 3;
            case FOUR: return 4;
            case FIVE: return 5;
            case SIX: return 6;
            case SEVEN: return 7;
            case EIGHT: return 8;
            case NINE: return 9;
            case TEN: return 10;
            case JACK: return 10;
            case QUEEN: return 10;
            case KING: return 10;
            default: return 0;
        }

    }

}
