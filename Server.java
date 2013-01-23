import org.vertx.java.deploy.Verticle;
import org.vertx.java.core.json.JsonObject;
import org.vertx.java.core.json.JsonArray;
import org.vertx.mods.WebServer;
import org.vertx.java.core.Handler;
import org.vertx.java.core.http.HttpServerRequest;
import org.vertx.java.core.http.RouteMatcher;
import org.vertx.java.core.eventbus.EventBus;
import org.vertx.java.core.eventbus.Message;

public class Server extends WebServer {

  final RouteMatcher matcher = new RouteMatcher();

  public void start() {

    // Event bus 
    final EventBus eb = vertx.eventBus();

    // The handler for getting conferences
    Handler<Message> conferencesHandler = new Handler<Message>() {
      public void handle(Message message) {
        JsonArray data = new JsonArray();
        data.
        addObject(new JsonObject().
          putString("id", "uk2013").
          putString("text", "Devoxx UK 2013").
          putArray("conftypes", new JsonArray().
            add(new JsonObject().putString("id", "conf").putString("text", "Conference")).
            add(new JsonObject().putString("id", "bof").putString("text", "BOF")).
            add(new JsonObject().putString("id", "quickie").putString("text", "Quickie"))
          )
        ).
        addObject(new JsonObject().
          putString("id", "fr2013").
          putString("text", "Devoxx FR 2013").
          putArray("conftypes", new JsonArray().
            add(new JsonObject().putString("id", "conf").putString("text", "Conference")).
            add(new JsonObject().putString("id", "bof").putString("text", "BOF")).
            add(new JsonObject().putString("id", "quickie").putString("text", "Quickie")).
            add(new JsonObject().putString("id", "handson").putString("text", "Hands-on Labs")).
            add(new JsonObject().putString("id", "tools").putString("text", "Tools in action")).
            add(new JsonObject().putString("id", "uni").putString("text", "University"))
          )
        );
        message.reply(data);
      }
    };
    eb.registerHandler("conferences", conferencesHandler);

    // The handler for getting conferences
    Handler<Message> proposalsHandler = new Handler<Message>() {
      public void handle(Message message) {
        JsonArray data = new JsonArray();
        data.
        addObject(new JsonObject().
          putString("dtCreat", "20130101").
          putString("conf", "fr2013").
          putString("type", "tools").
          putString("title", "Crash in action").
          putString("summary", "<i>Crash rocks!</i>").
          putString("author", "Julien Viet").
          putString("bio", "<i>Mars Jug Leader</i>")
        );
        message.reply(data);
      }
    };
    eb.registerHandler("proposals", proposalsHandler);

    // The matchers
    matcher.get("/conferences", new Handler<HttpServerRequest>() {
      public void handle(final HttpServerRequest req) {
        eb.send("conferences", null, new Handler<Message<JsonArray>>() {
          public void handle(Message<JsonArray> message) {
            req.response.headers().put("Content-Type", "application/json; charset=UTF-8");
            req.response.end(message.body.encode());
          }
        });
      }
    });
    matcher.get("/proposals", new Handler<HttpServerRequest>() {
      public void handle(final HttpServerRequest req) {
        eb.send("proposals", null, new Handler<Message<JsonArray>>() {
          public void handle(Message<JsonArray> message) {
            req.response.headers().put("Content-Type", "application/json; charset=UTF-8");
            req.response.end(message.body.encode());
          }
        });
      }
    });

    // No match possible we delegate to the parent web server
    matcher.noMatch(new Handler<HttpServerRequest>() {
      public void handle(HttpServerRequest req) {
        Server.super.handle(req);
      }
    });

    // Start the web server
    super.start();
  }

  public void handle(HttpServerRequest req) {
    matcher.handle(req);
  }
}
