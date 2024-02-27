import TestService from "./test.service";
import UserService from "./user.service";
import PublishingPlaceService from "./publisher.service";
import PaymentService from "./payment.service";
import InvoiceService from "./invoice.service";
import ImageService from "./image.service";
import GenreService from "./genres.service";
import CartItemService from "./cart.service";
import BookService from "./book.service";
import AuthorService from "./author.service";
import AuthService from "./auth.service";
import AddressService from "./address.service";

const RootService = {
    BookService,
    TestService,
    UserService,
    PublishingPlaceService,
    PaymentService,
    InvoiceService,
    ImageService,
    GenreService,
    CartItemService,
    AuthorService,
    AuthService,
    AddressService,
};

export default RootService;