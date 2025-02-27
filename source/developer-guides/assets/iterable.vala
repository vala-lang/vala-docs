using Gee;

public class RangeIterator : Object, Iterator<int>, Traversable<int> {

   public bool read_only {
       get { return true; }
   }

   public bool valid {
       get { return true; }
   }

   private Range range;
   private int current;

   public RangeIterator (Range range) {
       this.range = range;
       this.current = range.from - 1;
   }

   public bool next () {
       if (!has_next ()) {
           return false;
       }
       this.current++;
       return true;
   }

   public bool has_next () {
       return this.current < this.range.to;
   }

   /* Here the 'new' keyword is used because Object already
      has a 'get' method. This will hide the original method.
      Otherwise you'll get a warning. */
   public new int get () {
       return this.current;
   }

   public new RangeIterator dup_data (string key, DuplicateFunc<RangeIterator> f) {
       return this;
   }

   public void remove () {
       assert_not_reached ();
   }

   public bool @foreach(ForallFunc<int> f) {
       for (int i = this.range.from; i < this.range.to; i++) {
           if (! f (i)) {
               return false;
           }
       }
       return true;
   }
}

public class Range : Object, Iterable<int>, Traversable<int> {

   public int from { get; private set; }
   public int to { get; private set; }

   public Range (int from, int to) {
       assert (from < to);
       this.from = from;
       this.to = to;
   }

   public Type element_type {
       get { return typeof (int); }
   }

   public Iterator<int> iterator () {
       return new RangeIterator (this);
   }

   public bool @foreach(ForallFunc<int> f) {
       for (int i = this.from; i < this.to; i++) {
           f (i);
       }
       return true;
   }
}

void main () {
   foreach (int i in new Range (10, 20)) {
       stdout.printf ("%d\n", i);
   }
}

