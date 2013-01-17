import org.vertx.java.deploy.Verticle;
import org.vertx.java.core.json.JsonObject;
import org.vertx.mods.WebServer;
import org.vertx.java.core.Handler;
import org.vertx.java.core.http.HttpServerRequest;
import org.vertx.java.core.http.RouteMatcher;

public class Server extends WebServer {

  final RouteMatcher matcher = new RouteMatcher();

  public void start() {

    matcher.get("/dogs", new Handler<HttpServerRequest>() {
      public void handle(HttpServerRequest req) {
        req.response.end("You requested dogs");
      }
    });

    matcher.noMatch(new Handler<HttpServerRequest>() {
      public void handle(HttpServerRequest req) {
        Server.super.handle(req);
      }
    });

    super.start();
  }

  public void handle(HttpServerRequest req) {
    matcher.handle(req);
  }
}
